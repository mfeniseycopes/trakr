# trakr

[Heroku link][heroku]

[heroku]: http://trakr.herokuapp.com

## Minimum Viable Product

trakr is a web application inspired by strava.com built using Ruby on Rails and React.js. It is used to track activities via gps data and view and follow other users activities.

- [x] Hosting on Heroku
- [x] A production README, replacing this README
- [x] Users
  - [x] Creation (Sign Up)
  - [x] Login
  - [x] Guest login
  - [x] Accurate navigation
  - [x] CSS Styling that matches strava.com
- [x] Profiles
  - [x] Users can view theirs and others profiles
  - [x] Users can edit their profile
  - [x] Accurate navigation
  - [x] Lots of seed data
  - [x] CSS Styling that matches strava.com
- [ ] Activities
  - [ ] Upload activity
  - [ ] Manually create activity
  - [ ] View activity
  - [ ] Edit activity
  - [ ] Present data about activity (time, speed, distance)
  - [ ] View list of activities on profiles
  - [ ] Accurate navigation
  - [ ] Lots of seed data
  - [ ] CSS Styling that matches strava.com
- [ ] Social
  - [ ] Follow users
  - [ ] Unfollow users
  - [ ] Social feed on homepage
  - [ ] Comments on Activities
  - [ ] Props on activities
  - [ ] Accurate navigation
  - [ ] Lots of seed data
  - [ ] CSS Styling that matches strava.com
- [ ] Segments (BONUS)
  - [ ] Create segment from activity
  - [ ] View Segments
  - [ ] Automatically check for and link segments on new activities
  - [ ] View all segments
  - [ ] View segments for activity
- [ ] More data (BONUS)
  - [ ] Display mile splits for runs
  - [ ] Show elevation
  - [ ] Graph speed, elevation for activities

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]


[views]: docs/wireframes/wireframes.pdf
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md
[phases]: docs/phases

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (2 days, W1 W 6pm)

**Objective:** Functioning rails project with front-end Authentication and navigation skeleton

* [x] create new project
* [x] create `User` model
* [x] authentication backend setup
* [x] create `StaticPages` controller and root view
* [x] set up webpack & flux scaffold with skeleton files
* [x] setup `APIUtil` to interact with the API
* [x] set up flux cycle for frontend auth
* [x] components:
  * [x] `App`
  * [x] `Navbar`
    * [x] `UserNav` w/ empty links
      * [x] `LoginForm`
* [x] directs to `/` and empty `App` component
* [x] style components
* [x] seed users

#### * Not implemented *

* `SignupForm`: merged with LoginForm
* `LoggedInNav`: trivially implemented within NavBar (will break out after activities)
* `MainNav`: trivially implemented within NavBar (will break out after activities)

### Phase 2: User Profiles and UI framework (1 day, W1 Th 6pm)

**Objective:** User profiles can be viewed and edited

* [x] `UsersController#update`
* [x] components:
  * [x] `Profile`
    * [x] `ProfileDetail`
    * [x] `ProfileForm`
  * [x] stub components for:
    * [x] `FollowButton`
    * [x] `ProgressPane`
    * [x] `ActivityTable`
* [x] get reasonable css sizing for components

#### * Not implemented *

* `EditProfileButton`: not needed (same page editing instead of routed)

### Phase 3: Activity Creation and Details (2 days, W2 M 6pm)

**Objective:** Activities can be created via file upload or google maps route creation

* [ ] create `Activity` model
* [ ] `ActivityUpload` component
  * [ ] `FileUpload` component
  * [ ] `ActivityForm` component
* [ ] necessary flux loop for activity creation
* [ ] setup use of Google Maps API
* [ ] `ManualEntry` component
  * [ ] `RouteCreatorMap` component
    * [ ] listens for clicks on google.map
    * [ ] draws route polylines between them
    * [ ] user can clear polylines
    * [ ] marker positions are saved on `ActivityForm` submit
* [ ] activty data saved as `GPX` instance serialized to db (use `gpx` gem)
* [ ] `ActivityDetail` component
* [ ] can edit activity
* [ ] can delete activity
* [ ] reasonable css styling for activity creation, activity detail
* [ ] seed activities

### Phase 4: Incorporate activities (1 day, W2 T 6pm)

**Objective:** Activities can be seen on user's profile page and training tab

* [ ] create `ActivityTable` component
* [ ] include on `ProfileDetail` and `Training` components
* [ ] create `ProgressPane` to display activity totals


### Phase 5: Follows (1 day, W2 W 6pm)

**Objective:** Users can follow other users and see them in their dashboard

* [ ] create `Follows` model
* [ ] `FollowButton` on `Profile` component
  * [ ] can follow and unfollow user
* [ ] create `Dashboard` component
  * [ ] create `ActivityItem` component
* [ ] `Dashboard` will display activities of followed users
* [ ] style `Dashbaord` and `FollowButton`
* [ ] seed follows

### Phase 6: Explore (1 day, W2 Th 6pm)

**Objective:** Users can view list of other users and activities

* [ ] create `Explore` component
* [ ] create `SearchBar`
* [ ] create `UserTable`
* [ ] create `ActivityTable`
* [ ] changing text in `SearchBar` updates list of results in table
  * [ ] searching while looking at users filters on user name
  * [ ] searching while looking at activities filters on title

### Phase 7: Props and Comments (BONUS)

**Objective:** Users can leave `props` or `comments` on activities

* [ ] create `PropsCommentsButtons`
  * [ ] create `PropButton`
  * [ ] create `CommentButton`
* [ ] create PropsCommentsPane
* [ ] include components in `ActivityDetail` and `Dashboard` components
* [ ] seed `props` and `comments`
* [ ] style components

### Phase 8: More data

### Phase 9: Segment Matching
