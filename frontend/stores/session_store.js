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
  _currentUser = user;
  document.body.className = "";
  hashHistory.push('/profile');
  SessionStore.__emitChange();

}

function _logout() {
  _currentUser = {};
  document.body.className = "logged-out";
  SessionStore.__emitChange();
}

module.exports = SessionStore;
