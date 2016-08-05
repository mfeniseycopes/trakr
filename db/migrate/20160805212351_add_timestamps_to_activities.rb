class AddTimestampsToActivities < ActiveRecord::Migration[5.0]
  def change
    change_table :activities do |t|
      t.timestamps
    end
  end
end
