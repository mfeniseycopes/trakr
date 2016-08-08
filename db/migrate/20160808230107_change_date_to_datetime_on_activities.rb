class ChangeDateToDatetimeOnActivities < ActiveRecord::Migration[5.0]
  def change
    change_column :activities, :date,  :datetime
  end
end
