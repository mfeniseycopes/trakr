class AddGpxToActivities < ActiveRecord::Migration[5.0]
  def change
    change_table :activities do |t|
      t.attachment :gpx
    end
  end
end
