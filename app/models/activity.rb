# == Schema Information
#
# Table name: activities
#
#  id               :integer          not null, primary key
#  user_id          :integer          not null
#  activity_type_id :integer          not null
#  title            :string           not null
#  description      :text
#  date             :date             not null
#  distance         :float
#  duration         :integer
#

class Activity < ActiveRecord::Base

  belongs_to :user
  belongs_to :activity_type

  validates :user_id, :activity_type_id, :title, :date, presence: true

  def type_name
    self.type.name
  end

  def user_name
    self.user.name
  end

end
