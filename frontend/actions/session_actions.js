const AppDispatcher = require('../dispatchers/dispatcher');
const SessionApiUtil = require('../utils/session_api_util');
const SessionConstants = require('../constants/session_constants');

const SessionActions = {

  error(res) {
    console.log(`An error occurred: ${res}`);
  },

  login(email, password) {
    SessionApiUtil.login(
      email, password,
      SessionActions.receiveCurrentUser,
      SessionActions.error
    );
  },

  logout() {
    debugger
    SessionApiUtil.logout(
      SessionActions.removeCurrentUser,
      SessionActions.error
    );
  },

  receiveCurrentUser(user) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      currentUser: user
    });
  },

  removeCurrentUser(user) {

    debugger

    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT,
    });
  },

  signup(email, password) {
    SessionApiUtil.signup(
      {email: email, password: password},
      SessionActions.receiveCurrentUser,
      SessionActions.error
    );
  }

};

module.exports = SessionActions;
