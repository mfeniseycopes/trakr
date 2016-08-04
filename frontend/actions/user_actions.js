const AppDispatcher = require('../dispatchers/dispatcher');
const ErrorActions = require('../actions/error_actions');
const UserApiUtil = require('../utils/user_api_util');
const UserConstants = require('../constants/user_constants');

const UserActions = {


  getUser(id) {
    UserApiUtil.getUser(id, this.receiveUser, ErrorActions.setErrors);
  },

  receiveUser(user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_USER,
      user: user
    });
  },

  updateUser(user) {
    UserApiUtil.updateUser(id, this.receiveUser, ErrorActions.setErrors);
  }
};

module.exports = UserActions;
