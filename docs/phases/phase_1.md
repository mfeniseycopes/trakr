# Phase 1: Backend setup and Front End User Authentication (2 days, W1 W 6pm)

## Rails

### Models

* User
* Session

### Controllers

* UsersController (CRU)
* SessionsController (CD)
* ApplicationController

### Views

* users/show.json.jbuilder

## Flux

### Views

* App
* Navbar
* SignupForm
* LoginForm

### Stores

* CurrentUser
* Error

### Actions

* SessionActions.logIn
* SessionActions.signUp
* SessionActions.fetchCurrentUser
* SessionActions.logOut
* SessionActions.receiveCurrentUser
* SessionActions.removeCurrentUser
* ErrorActions.setErrors
* ErrorActions.removeErrors

### ApiUtil
* logIn
* logOut
* signUp
* fetchCurrentUser

## Gems/Libraries

* BCrypt (Gem)
* "babel-core": "^6.2.0",
* "babel-loader": "^6.2.0",
* "babel-preset-react": "^6.1.18",
* "webpack": "^1.12.2",
* "babel-preset-es2015": "^6.9.0",
* "flux": "^2.1.1",
* "react": "^0.14.2",
* "react-dom": "^0.14.2",
* "react-router": "2.0.1"
