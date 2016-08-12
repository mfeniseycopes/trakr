json.partial! 'api/users/user', user: @user
json.followee_activities @user.followee_activities, partial: 'api/activities/activity', as: :activity
