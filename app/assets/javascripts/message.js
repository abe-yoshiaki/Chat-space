$(function () {
  function buildHTML(message) {
    var insertImage = '';
    if (message.image) {
      insertImage = `<img class='lower-message__image' src="${message.image}">`;
    }
    var html = `<div class='chat-main__messages__message' data-id="${message.id}">
                  <div class ='chat-main__messages__message__upper-info'>
                    <div class='chat-main__messages__message__upper-info--user'>
                      ${message.name}
                    </div>
                    <div class='chat-main__messages__message__upper-info--date'>
                      ${message.created_at}
                    </div>
                  </div>
                  <div class='chat-main__messages__message__message-text'>
                    ${message.content}
                    <br>
                    ${insertImage}  
                  </div>
                </div>`;
    return html;
  }
  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })

      .done(function (data) {
        var html = buildHTML(data);
        $('.chat-main__messages').append(html)
        $('#message_content').val('')
        $('.chat-main__messages').animate({ scrollTop: $(".chat-main__messages")[0].scrollHeight }, 900);
      })
      .fail(function () {
        alert('メッセージの送信に失敗しました');
      })
    return false;
  })
})