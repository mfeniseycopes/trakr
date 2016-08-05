class AddTimestampsToActivityTypes < ActiveRecord::Migration[5.0]
  def change
    change_table :activity_types do |t|
      t.timestamps
    end
  end
end
