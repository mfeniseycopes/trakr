# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base

  validates :email, :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  # user must supply password
  validates :password, length: { minimum: 6 }, allow_nil: true
  # ensures email is valid format
  validates_format_of :email,:with => /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/

  # user must always have a session_token
  after_initialize :ensure_session_token

  # avatar setup
  has_attached_file :avatar, default_url: "default_avatar.jpg"
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

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
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

  # private methods
  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end


end
