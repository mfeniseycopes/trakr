# == Schema Information
#
# Table name: follows
#
#  id          :integer          not null, primary key
#  follower_id :integer          not null
#  followee_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Follow < ActiveRecord::Base

  belongs_to :followee, class_name: "User"
  belongs_to :follower, class_name: "User"

  validates :followee, :follower, presence: true
  # ensure ordered pairwise uniqueness
  validates_uniqueness_of :followee, scope: [:follower]

end
