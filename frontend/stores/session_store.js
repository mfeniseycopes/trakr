// react
const hashHistory     = require('react-router').hashHistory;

// project
const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatchers/dispatcher');
const SessionConstants = require('../constants/session_constants');

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
    _setCurrentUser(payload.currentUser);
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
  hashHistory.push('/profile');
  _setCurrentUser(user);
}

function _logout() {
  _setCurrentUser({});
}

function _setCurrentUser(user) {
  document.body.className = (user === {} ? "logged-out" : "");
  _currentUser = user;
  SessionStore.__emitChange();
}

module.exports = SessionStore;
