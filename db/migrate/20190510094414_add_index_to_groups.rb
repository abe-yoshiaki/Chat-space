class AddIndexToGroups < ActiveRecord::Migration[5.0]
  def change
    add_index :Groups, :name
  end
end
