json.extract! @activity,
  :description,
  :date,
  :distance,
  :duration,
  :encoded_polyline,
  :id,
  :speed,
  :title

json.activity_type do
  json.id @activity.activity_type_id
  json.name @activity.activity_type_name
end

json.user do
  json.id @activity.user_id
  json.name @activity.user_name
  json.avatar_url @activity.user.avatar_url
end
