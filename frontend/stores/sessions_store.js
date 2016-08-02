// project
const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatchers/dispatcher');
const SessionConstants = require('../constants/session_constants');

const SessionStore = new Store(AppDispatcher);

// closed instance var
let _currentUser = {};

// public methods
SessionStore.currentUser = () => { return Object.assign({}, _currentUser); };

SessionStore.isUserLoggedIn = () => { return _currentUser.id !== undefined; };

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
  SessionStore.__emitChange();
}

function _logout() {
  _currentUser = {};
  SessionStore.__emitChange();
}

module.exports = SessionStore;
