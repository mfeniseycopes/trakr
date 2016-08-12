// react
const hashHistory       = require('react-router').hashHistory;

// project
const Store             = require('flux/utils').Store;
const AppDispatcher     = require('../dispatchers/dispatcher');
const SessionConstants  = require('../constants/session_constants');

const SessionStore = new Store(AppDispatcher);

// closed instance var
let _currentUser = {};

// public methods
SessionStore.currentUser = () => {
  return Object.assign({}, _currentUser);
};

SessionStore.isLoggedIn = () => {
  return _currentUser.email !== undefined;
};

SessionStore.__onDispatch = (payload) => {
  switch(payload.actionType) {
    case SessionConstants.RECEIVE_BOOTSTRAPPED_USER:
    _bootstrapUser(payload.currentUser);
    break;

    case SessionConstants.LOGIN:
    _login(payload.currentUser);
    break;

    case SessionConstants.LOGOUT:
    _logout();
    break;
  }
};

// private methods
function _login(user) {
  _setCurrentUser(user);
  document.body.className = "logged-in";
  hashHistory.push('/dashboard');
}

function _logout() {
  _setCurrentUser({});
  document.body.className = "logged-out";
  hashHistory.push('/signup');
}

function _bootstrapUser(user) {
  _setCurrentUser(user);
  document.body.className = "logged-in";
}

function _setCurrentUser(user) {
  _currentUser = user;
  SessionStore.__emitChange();
}

module.exports = SessionStore;
