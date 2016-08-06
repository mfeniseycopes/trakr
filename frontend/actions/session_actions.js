const AppDispatcher = require('../dispatchers/dispatcher');
const ErrorActions = require('../actions/error_actions');
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
      ErrorActions.setErrors
    );
  },

  logout() {
    SessionApiUtil.logout(
      SessionActions.removeCurrentUser,
      ErrorActions.setErrors
    );
  },

  receiveBootstrappedUser(user) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.RECEIVE_BOOTSTRAPPED_USER,
      currentUser: user
    });
  },

  receiveCurrentUser(user) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      currentUser: user
    });
  },

  removeCurrentUser(user) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT,
    });
  },

  signup(user) {
    SessionApiUtil.signup(
      user,
      SessionActions.receiveCurrentUser,
      ErrorActions.setErrors
    );
  }

};

module.exports = SessionActions;
