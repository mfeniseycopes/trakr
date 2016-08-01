## Component Hierarchy

**Bolded** components are associated with routes.

(:exclamation: Remember, the bolded components are created by their
associated routes, so the nesting of your bolded components must
_**exactly**_ match the nesting of your routes.)

* **App**
  * Navbar
    * MainNav
    * LoggedInNav
      * NotificationsList
      * UserLinks
      * UploadLinks
  * **LoginForm**
  * **SignupForm**
  * **Dashboard**
    * ActivityItem
      * PropsCommentsButtons
        * PropButton
        * CommentButton
      * ActivityMiniMap
    * ProgressPane
  * **Training**
    * ActivityTable
  * **Activity**
    * PropsCommentsButtons
      * PropButton
      * CommentButton
    * PropsCommentsPane
    * ActivityMap
    * ActivityForm
    * DeleteActivityButton
    * EditActivityButton
  * **Explore**
    * SearchBar
    * UserTable
    * ActivityTable
  * **Profile**
    * ProfileDetail
    * **ProfileEdit**
    * FollowButton
    * EditProfileButton
    * ProgressPane
    * ActivityTable
  * **UploadActivity**
    * ActivityUpload
    * ActivityForm
  * **ManualEntry**
    * RouteCreatorMap
    * ActivityForm



## Routes

* **component:** `App` **path:** `/`
  * **component** `LoginForm` **path:** '/login'
  * **component** `SignupForm` **path:** '/signup'
  * **component:** `Dashboard` **path:** '/dashboard'
  * **component:** `Training` **path:** `/training`
  * **component:** `Activity` **path:** `activities/:id`
    * **component:** `ActivityEdit` **path:** `activities/:id/edit`
  * **component:** `Explore` **path:** '/explore'
  * **component:** `Profile` **path:** `/users/:id`
    * **component:** `ProfileEdit` **path:** `/users/:id/edit`
