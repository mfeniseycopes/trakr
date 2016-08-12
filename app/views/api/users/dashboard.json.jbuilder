json.partial! 'api/users/user', user: @user
json.followee_activities @user.feed_activities, partial: 'api/activities/activity', as: :activity
json.week_stats @user.week_stats
