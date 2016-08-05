class AddForeignKeyConstraintsToActivities < ActiveRecord::Migration[5.0]
  def change
    rename_column :activities, :type_id, :activity_type_id
    add_foreign_key :activities, :users
    add_foreign_key :activities, :activity_types
  end
end
