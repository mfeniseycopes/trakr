class Follow < ActiveRecord::Base

  belongs_to(
    :follower,
    class_name: "User",
    foreign_key: :follower_id,
    primary_key: :id
  )

  belongs_to(
    :followee,
    class_name: "User",
    foreign_key: :followee_id,
    primary_key: :id
  )

  validates :followee, :follower, presence: true
  # ensure ordered pairwise uniqueness
  validates_uniqueness_of :follower, scope: [:followee]
  validates_uniqueness_of :followee, scope: [:follower]

end
