# == Schema Information
#
# Table name: activity_types
#
#  id   :integer          not null, primary key
#  name :string           not null
#

class ActivityType < ActiveRecord::Base

  has_many :activities

  validates :name, presence: true, uniqueness: true

end
