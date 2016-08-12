// react requires
const React       = require('react');
const ReactDOM    = require('react-dom');
const ReactRouter = require('react-router');
const Router      = ReactRouter.Router;
const Route       = ReactRouter.Route;
const IndexRoute  = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

// project requires
const ActivityCreationMap = require('./components/activities/activity_creation_map');
const Activity            = require('./components/activities/activity');
const ActivityForm        = require('./components/activities/activity_form');
const App                 = require('./components/app');
const Dashboard           = require('./components/dashboard');
const ErrorActions        = require('./actions/error_actions');
const LoginForm           = require('./components/sessions/login_form');
const Profile             = require('./components/users/profile');
const SessionActions      = require('./actions/session_actions');
const SessionStore        = require('./stores/session_store');
const Training            = require('./components/training');

// const UserApi = require('./utils/user_api_util');
// window.UserApi = UserApi;

// routes
const router = (
  <Router history={ hashHistory } >
    <Route path="/" component={ App } >

      <IndexRoute
        onEnter={ _redirectToLoginOrDashboard } />


      <Route path="/signup"
        component={ LoginForm }
        onEnter={ _ensureLoggedOut }/>

      <Route path="/login"
        component={ LoginForm }
        onEnter={ _ensureLoggedOut }/>

      <Route path="/dashboard"
        component={ Dashboard }
        onEnter={ _ensureLoggedIn } />

      <Route path="/profile"
        component={ Profile }
        onEnter={ _ensureLoggedIn } />

      <Route path="/users/:id"
        component={ Profile }
        onEnter={ _ensureLoggedIn } />


      <Route path="/training"
        component={ Training }
        onEnter={ _ensureLoggedIn } />

      <Route path="/create-activity"
        component={ ActivityCreationMap }
        onEnter={ _ensureLoggedIn } />

      <Route path="/new-activity"
        component={ Activity }
        onEnter={ _ensureLoggedIn }
        mode="create"/>

      <Route path="/activities/:id"
        component={ Activity }
        onEnter={ _ensureLoggedIn } />

    </Route>
  </Router>
);

function _redirectToLoginOrDashboard(nextState, replace) {
  if (SessionStore.isLoggedIn()) {
    replace('/dashboard');
  } else {
    replace('/signup');
  }
}

function _clearErrors() {
  ErrorActions.clearErrors();
}

function _ensureLoggedIn(nextState, replace) {
  if (!SessionStore.isLoggedIn()) {
    replace('/signup');
  }
}

function _ensureLoggedOut(nextState, replace) {
  if (SessionStore.isLoggedIn()) {
    replace('/profile');
  }
}

document.addEventListener(
  "DOMContentLoaded",
  () => {

    if (window.currentUser) {
      SessionActions.receiveBootstrappedUser(window.currentUser);
    }

    ReactDOM.render(
      router,
      document.getElementById('react-root')
    );
  }
);
