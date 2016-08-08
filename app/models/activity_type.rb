# == Schema Information
#
# Table name: activity_types
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ActivityType < ActiveRecord::Base

  has_many :activities

  validates :name, presence: true, uniqueness: true

end
