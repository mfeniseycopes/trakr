class CreateActivities < ActiveRecord::Migration[5.0]
  def change
    create_table :activities do |t|
      t.integer :user_id, null: false
      t.integer :type_id, null: false

      t.string :title, null: false
      t.text :description
      t.date :date, null: false
      t.float :distance
      t.integer :duration
    end

    add_index :activities, :user_id
    add_index :activities, :type_id
  end
end
