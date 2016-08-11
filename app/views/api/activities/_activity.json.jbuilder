json.extract! activity,
  :id,
  :title,
  :date,
  :distance,
  :duration,
  :activity_type_name

json.user do
  json.name activity.user_name
  json.avatar_url activity.user.avatar_url
end
