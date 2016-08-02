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

// routes
const router = (
  <Router history={ hashHistory } >
    <Route path="/" component={ App } >
      <Route path="/signup" component={ LoginForm } />
      <Route path="/login" component={ LoginForm } />
    </Route>
  </Router>
);


document.addEventListener(
  "DOMContentLoaded",
  () => {
    ReactDOM.render(
      router,
      document.getElementById('react-root')
    );
  }
)
