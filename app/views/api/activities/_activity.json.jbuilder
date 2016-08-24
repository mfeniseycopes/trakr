json.extract! activity,
  :id,
  :title,
  :date,
  :distance,
  :duration,
  :activity_type_name,
  :encoded_polyline,
  :speed

json.gpx_url activity.gpx.url

json.activity_type do
  json.id activity.activity_type.id
  json.name activity.activity_type.name
end

json.user do
  json.name activity.user_name
  json.avatar_url activity.user.avatar_url
  json.id activity.user.id
end
