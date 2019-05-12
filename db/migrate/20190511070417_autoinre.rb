class Autoinre < ActiveRecord::Migration[5.0]
  def change
    execute "ALTER TABLE users MODIFY COLUMN id INT AUTO_INCREMENT;"
  end
end
