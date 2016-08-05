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

  # gpx setup
  has_attached_file :gpx
  # validate filename
  validates_attachment_file_name :gpx, matches: [/gpx\Z/]

  before_post_process :determine_properties

  def activity_type_name
    self.activity_type.name
  end

  def determine_properties
    gpx = GPX::GPXFile.new(gpx_file: self.gpx.instance_variable_get(:@file).path)
    self.distance = gpx.distance
    self.date = gpx.time
    self.duration = gpx.duration
  end

  def user_name
    self.user.name
  end

end
