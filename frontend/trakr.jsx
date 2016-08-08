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
const LoginForm           = require('./components/sessions/login_form');
const Profile             = require('./components/users/profile');
const SessionActions      = require('./actions/session_actions');
const SessionStore        = require('./stores/session_store');

const IndexRouteStub  = require('./components/index_route_stub');

// routes
const router = (
  <Router history={ hashHistory } >
    <Route path="/" component={ App } >

      <IndexRoute
        onEnter={ _redirectToLoginOrProfile } />

      <Route path="/signup"
        component={ LoginForm }
        onEnter={ _ensureLoggedOut }/>

      <Route path="/login"
        component={ LoginForm }
        onEnter={ _ensureLoggedOut }/>


      <Route path="/profile"
        component={ Profile }
        onEnter={ _ensureLoggedIn } />

      <Route path="/users/:id"
        component={ Profile }
        onEnter={ _ensureLoggedIn } />


      <Route path="/create-activity"
        component={ ActivityCreationMap }
        onEnter={ _ensureLoggedIn } />

      <Route path="/new-activity"
        component={ ActivityForm }
        onEnter={ _ensureLoggedIn } />

      <Route path="/activities/:id"
        component={ Activity }
        onEnter={ _ensureLoggedIn } />


    </Route>
  </Router>
);

function _redirectToLoginOrProfile(nextState, replace) {
  if (SessionStore.isLoggedIn()) {
    replace('/profile');
  } else {
    replace('/signup');
  }
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

    console.log("working");

    ReactDOM.render(
      router,
      document.getElementById('react-root')
    );
  }
);
