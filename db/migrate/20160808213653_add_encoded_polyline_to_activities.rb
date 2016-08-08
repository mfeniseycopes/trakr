class AddEncodedPolylineToActivities < ActiveRecord::Migration[5.0]
  def change
    change_table :activities do |t|
      t.string :encoded_polyline
    end
  end
end
