# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

* `GET /api/users`
* `GET /api/users/:id`
* `POST /api/users`
* `PATCH /api/users/:id`

### Session

* `POST /api/session`
* `DELETE /api/session`
* `GET /api/session`

### Activities

* `GET /api/activities/:id`
* `GET /api/users/:id/activities`
* `GET /api/users/:id/followed_activities`
* `POST /api/activities`
* `PATCH /api/activities/:id`
* `DELETE /api/activities/:id`

### Follows

* `POST /api/users/:id/follows`
* `DELETE /api/follows/:id`

### Props

* `POST /api/activities/:id/props`
* `DELETE /api/props/:id`

### Comments

* `POST /api/activities/:id/comments`
* `DELETE /api/comments/:id`
