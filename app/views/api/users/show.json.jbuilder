json.extract! @user,
  :id,
  :email,
  :first_name,
  :last_name,
  :name,
  :avatar_url,
  :location,
  :bio,
  :user_since

json.following @user.followers.include?(current_user)

json.followers @user.followers.count

json.week_stats @user.week_stats
