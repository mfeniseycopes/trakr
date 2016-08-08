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

  # attr_accessor :route

  before_save :determine_properties

  def activity_type_name
    self.activity_type.name
  end

  def determine_properties
    if self.gpx_updated_at != nil
      gpx = GPX::GPXFile.new(gpx_file: self.gpx.instance_variable_get(:@file).path)
      self.distance = gpx.distance
      self.date = gpx.time
      self.duration = gpx.duration
    else
      gpx = GPX::GPXFile.new(name: self.title, distance: self.distance)
      gpx.tracks << GPX::Track.new

      @route.each do |point|
        gpx.tracks[0].points << GPX::TrackPoint.new(lat: point["lat"].to_f, lon: point["lng"].to_f)
      end

      self.gpx = StringIO.new(gpx.to_s)
    end
  end

  def route=(route)
    @route = route.values
  end

  def user_name
    self.user.name
  end

end
