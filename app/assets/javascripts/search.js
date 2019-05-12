$(function() {
  var search_list = $("#user_search_result");
  var member_list = $("#chat-group-users");

  function appendUsers(user_name) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user_name.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user_name.id}" data-user-name="${user_name.name}" >追加</div>
                </div>`
    search_list.append(html);
  };

  function appendErrMsg(user) {
    var html = `<div class=chat-group_errmsg>${ user }</div>`
    search_list.append(html);
  }

  function appendMembers(name, user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat_group_user_22'>
                <input name='group[user_ids][]' type='hidden' value="${user_id}">
                <p class='chat-group-user__name'>${name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    member_list.append(html);
  }

  $("#user-search-field").on('keyup', function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: "get",
      url: "/users",
      data: { keyword: input},
      dataType: "json"
    })

    .done(function(user_names){
      $("#user_search_result").empty();
      if (user_names.length !== 0){
        user_names.forEach(function(user_name){
          appendUsers(user_name);
        })
      }
      else {
        appendErrMsg("一致するユーザーが存在しません。");
      };
    })
    .fail(function(){
      alert('通信に失敗しました');
    });
  });

  $(document).on("click", '.user-search-add', function() {
    var name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
    $(this).parent().remove();
    appendMembers(name, user_id);
  });

  $(document).on("click", '.user-search-remove', function() {
    $(this).parent().remove();
  });
});
