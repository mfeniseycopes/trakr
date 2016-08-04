class CreateActivityTypes < ActiveRecord::Migration[5.0]
  def change
    create_table :activity_types do |t|
      t.string :name, null: false
    end

    add_index :activity_types, :name, unique: true
  end
end
