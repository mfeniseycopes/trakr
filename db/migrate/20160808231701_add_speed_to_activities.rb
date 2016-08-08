class AddSpeedToActivities < ActiveRecord::Migration[5.0]
  def change
    change_table :activities do |t|
      t.float :speed
    end
  end
end
