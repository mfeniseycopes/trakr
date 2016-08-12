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

# week totals
days_occurred_this_week = DateTime.now.wday
week_start = DateTime.now - days_occurred_this_week.days
week_end = week_start + 7

activities = @user.activities.where("date >= ? AND date <= ?", week_start, week_end)

puts activities

types = {
  ride: { count: 0, duration: 0, distance:0 },
  run: { count: 0, duration: 0, distance:0 },
  other: { count: 0, duration: 0, distance:0 }
}

activities.each do |activity|
  type = activity.activity_type_name.downcase.to_sym
  types[type][:count] += 1
  types[type][:duration] += activity.duration
  types[type][:distance] += activity.distance
end

json.week_stats = types
