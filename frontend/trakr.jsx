// react requires
const React       = require('react');
const ReactDOM    = require('react-dom');
const ReactRouter = require('react-router');
const Router      = ReactRouter.Router;
const Route       = ReactRouter.Route;
const IndexRoute  = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

// project requires
const App         = require('./components/app');
const LoginForm   = require('./components/sessions/login_form');
const Profile     = require('./components/users/profile');
const SessionActions  = require('./actions/session_actions');
const SessionStore    = require('./stores/session_store');

const IndexRouteStub    = require('./components/index_route_stub');

// routes
const router = (
  <Router history={ hashHistory } >
    <Route path="/" component={ App } >

      <IndexRoute
        component={ LoginForm }
        onEnter={ _ensureLoggedIn } />

      <Route path="/signup"
        component={ LoginForm } />

      <Route path="/login"
        component={ LoginForm } />

      <Route path="/profile"
        component={ Profile }
        onEnter={ _ensureLoggedIn } />

      <Route path="/users/:id"
        component={ Profile }
        onEnter={ _ensureLoggedIn } />

    </Route>
  </Router>
);

function _ensureLoggedIn(nextState, replace) {
  // We don't want users to be able to visit our 'new' or 'review' routes
  // if they haven't already signed in/up. Let's redirect them!
  // `replace` is like a redirect. It replaces the current entry
  // into the history (and the hashFragment), so the Router is forced
  // to re-route.

    if (!SessionStore.isLoggedIn()) {
      replace('/signup');
    }
}

document.addEventListener(
  "DOMContentLoaded",
  () => {

    if (window.currentUser) {
      SessionActions.receiveCurrentUser(window.currentUser);
    }

    console.log("working");

    ReactDOM.render(
      router,
      document.getElementById('react-root')
    );
  }
);
