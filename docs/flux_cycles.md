# Flux Cycles

## Auth Cycles

### Session API Request Actions

* `logIn`
  * invoked from `LoginForm` `onSubmit`
  * `POST /api/session` is called.
  * `receiveCurrentUser` is set as the callback.
* `logOut`
  * invoked from `UserLinks -> Logout` `onClick`
  * `DELETE /api/session` is called.
  * `removeCurrentUser` is set as the success callback.
* `fetchCurrentUser`
  * invoked from `App` in `didMount`
  * `GET /api/session` is called.
  * `receiveCurrentUser` is set as the success callback.

### Session API Response Actions

* `receiveCurrentUser`
  * invoked from an API callback
  * stores in `_currentUser` in `CurrentUserStore`
* `removeCurrentUser`
  * invoked from an API callback
  * removes `_currentUser` in `CurrentUserStore`

## User Cycles

### User API Request Actions

* `fetchUser`
  * invoked from `Profile` in `didMount`
  * `GET /api/users/:id` is called.
  * `receiveUser` is set as the success callback.
* `updateUser`
  * invoked from `ProfileEdit` `onSubmit`
  * `PATCH /api/users/:id` is called.
  * `receiveUser` is set as the success callback.

### User API Response Actions

* `receiveUser`
  * invoked from API callback
  * stores in `_user` in `UserStore`
* `receiveUsers`
  * invoked from API callback
  * stores in `_users` in `UsersStore`

## Users List Cycles

### Users List API Request Actions

* `fetchFilteredUsers`
  * invoked from `SearchBar` `onChange`
  * `GET /api/activities?query=:query` is called
  * `receiveUsers` is set as the success callback.

### Users List API Response Actions

* `receiveUsers`
  * invoked from API callback
  * stores in `_users` in `UsersStore`

## Activity Cycles

### Activity API Request Actions

* `createActivity`
  * invoked from `ActivityForm` `onSubmit`
  * `POST /api/activities` is called.
  * `receiveActivity` is set as the success callback.
* `deleteActivity`
  * invoked from `DeleteActivityButton` `onClick`
  * `DELETE /api/activities/:id` is called.
  * `redirectToTraining` is set as the success callback.
* `fetchActivity`
  * invoked from `Activity` on `didMount`
  * `GET /api/activities/:id` is called.
  * `receiveActivity` is set as the success callback.
* `updateActivity`
  * invoked from `ActivityForm` `onSubmit`
  * `PATCH /api/activities/:id` is called.
  * `receiveActivity` is set as the success callback.


### Activity API Response Actions

* `receiveActivity`
  * invoked from API callback
  * stores in `_activity` in `ActivityStore`
* `redirectToTraining`
  * invoked from API callback
  * pushes `/training` to `hashHistory`

## Activities List Cycles

### Activities API Request Actions

* `fetchUserActivities`
  * invoked from `ProfileDetail` on `didMount`
  * `GET /api/user/:id/activities` is called.
  * `receiveActivities` is set as the success callback.
* `fetchCurrentUserActivities`
  * invoked from `Training` on `didMount`
  * `GET /api/user/:id/activities` is called.
  * `receiveActivities` is set as the success callback.
* `fetchFollowedActivities`
  * invoked from `Dashboard` `didMount`
  * `GET /api/user/:id/followed_activities`
  * `receiveActivities` is set as the success callback.
* `fetchFilteredActivities`
  * invoked from `SearchBar` `onChange`
  * `GET /api/activities?query=:query` is called
  * `receiveActivities` is set as the success callback.

### Activities API Response Actions
* `receiveActivities`
  * invoked from API callback
  * stores in `_activities` in `ActivitiesStore`

## Follow Cycles

### Follows API Request Actions

* `createFollow`
  * invoked from `FollowButton` `onClick`
  * `POST /api/users/:id/follows` is called.
  * `updateFollowState` is set as the success callback.
* `deleteFollow`
  * invoked from `FollowButton` `onClick`
  * `DELETE /api/follows/:id` is called.
  * `updateFollowState` is set as the success callback.

### Follows API Response Actions

* `updateFollowState`
  * invoked from API callback
  * updates `_user` in UserStore

## Props Cycles

* `createProp`
  * invoked from `PropButton` `onClick`
  * `POST /api/activities/:id/props` is called.
  * `receiveProp` is set as the success callback.
* `deleteProp`
  * invoked from `PropButton` `onClick`
  * `DELETE /api/props/:id` is called.
  * `receiveProp` is set as the success callback.

## Comments Cycles

* `createComment`
  * invoked from `CommentButton` `onClick`
  * `POST /api/activities/:id/comments` is called.
  * `receiveComment` is set as the success callback.
* `deleteComment`
  * invoked from `DeleteCommentButton` `onClick`
  * `DELETE /api/comments/:id` is called.
  * `receiveComment` is set as the success callback.
