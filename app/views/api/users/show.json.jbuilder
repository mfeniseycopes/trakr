json.extract! @user,
  :id,
  :email,
  :first_name,
  :last_name,
  :avatar_url,
  :location,
  :bio,
  :user_since

json.following @user.followers.include?(current_user)
