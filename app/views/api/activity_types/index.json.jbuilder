json.array!(@activity_types) do |activity_type|
  json.id activity_type.id
  json.name activity_type.name
end
