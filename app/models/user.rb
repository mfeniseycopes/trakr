# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  email               :string           not null
#  password_digest     :string           not null
#  session_token       :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#  first_name          :string           not null
#  last_name           :string           not null
#  location            :string
#  bio                 :text
#

class User < ActiveRecord::Base

  has_many :activities

  has_many :in_follows, class_name: "Follow", foreign_key: "followee_id"
  has_many :out_follows, class_name: "Follow", foreign_key: "follower_id"
  has_many :followers, through: :in_follows, source: :follower
  has_many :followees, through: :out_follows, source: :followee

  has_many :followee_activities, through: :followees, source: :activities

  validates :email, :password_digest, :session_token, :first_name, :last_name, presence: true
  validates :email, :session_token, uniqueness: true

  # user must supply password
  validates :password, length: { minimum: 6 }, allow_nil: true
  # ensures email is valid format
  validates_format_of :email,:with => /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/

  # user must always have a session_token
  after_initialize :ensure_session_token

  # avatar setup
  has_attached_file :avatar, default_url: "images/cat_avatar.jpg"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  # class vars & methods
  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)

    if user && user.is_password?(password)
      user
    else
      nil
    end
  end

  def self.generate_session_token
    session_token = SecureRandom.urlsafe_base64

    # ensure uniqueness (though very unlikely)
    while User.find_by(session_token: session_token)
      session_token = SecureRandom.urlsafe_base64
    end

    session_token
  end

  # instance vars & methods
  attr_reader :password # can be validated

  def avatar_url
    self.avatar.url
  end

  def feed_activities
    (self.followee_activities + self.activities).sort do |a, b|
      # debugger
      b.date <=> a.date
    end
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def name
    "#{self.first_name} #{self.last_name}"
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def user_since
    self.created_at.year
  end

  def week_stats
    # week totals
    days_occurred_this_week = DateTime.now.wday
    week_start = DateTime.now - days_occurred_this_week.days
    week_end = week_start + 7

    activities = self.activities.where("date >= ? AND date <= ?", week_start, week_end)

    puts activities

    stats = {
      ride: { count: 0, duration: 0, distance:0 },
      run: { count: 0, duration: 0, distance:0 },
      other: { count: 0, duration: 0, distance:0 }
    }

    activities.each do |activity|
      type = activity.activity_type_name.downcase.to_sym
      stats[type][:count] += 1
      stats[type][:duration] += activity.duration
      stats[type][:distance] += activity.distance
    end

    stats
  end

  # private methods
  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end


end
