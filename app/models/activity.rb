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
#  gpx_file_name    :string
#  gpx_content_type :string
#  gpx_file_size    :integer
#  gpx_updated_at   :datetime
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  encoded_polyline :string
#

class Activity < ActiveRecord::Base

  belongs_to :user
  belongs_to :activity_type

  validates :user_id, :activity_type_id, :title, :date, :duration, :distance, presence: true
  validates :duration, numericality: { greater_than: 0 }

  # gpx setup
  has_attached_file :gpx,
    :s3_headers =>  { "Content-Type" => "application/gpx+xml" }
  # validate filename
  validates_attachment_content_type :gpx, content_type: ["application/gpx+xml", "application/xml"]

  # attr_accessor :route

  before_create :determine_properties
  before_update :update_properties


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
       # convert distance to km for gpx compatibility
      gpx = GPX::GPXFile.new(
        name: self.title,
        distance: self.distance * 1.60934,
        moving_duration: self.duration
      )
      gpx.tracks << GPX::Track.new
      gpx.tracks[0].segments << GPX::Segment.new

      # add trackpoints to gpx instance
      points = []
      @route.each do |point|
        points << GPX::TrackPoint.new(lat: point["lat"].to_f, lon: point["lng"].to_f)
      end
      gpx.tracks[0].segments[0].points = points

      # create temp file to save to paperclip (StringIO creates incorrect content type)
      tmp = Tempfile.new(["tmp", ".gpx"])
      tmp.write(gpx.to_s)
      tmp.rewind

      # update gpx properties
      self.speed = gpx.average_speed(units: "miles")
      self.gpx = tmp
    end

  end

  def route=(route)
    @route = route.values
  end

  def update_properties
    self.speed = self.distance / (self.duration / 360)
  end

  def user_name
    self.user.name
  end

end
