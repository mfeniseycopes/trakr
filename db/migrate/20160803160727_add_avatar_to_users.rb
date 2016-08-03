class AddAvatarToUsers < ActiveRecord::Migration[5.0]
  def change
    change_table :users do |t|
      t.attachment :avatar
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :location
      t.text :bio
    end
  end
end
