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
      this.receiveCurrentUser,
      this.error
    );
  },

  logout() {
    SessionApiUtil.logout(
      this.removeCurrentUser,
      this.error
    );
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

  signup(email, password) {
    SessionApiUtil.signup(
      {email: email, password: password},
      this.receiveCurrentUser,
      this.error
    );
  }

};

module.exports = SessionActions;
