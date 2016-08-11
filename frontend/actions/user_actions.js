const AppDispatcher = require('../dispatchers/dispatcher');
const ErrorActions = require('../actions/error_actions');
const FollowApiUtil = require('../utils/follow_api_util');
const UserApiUtil = require('../utils/user_api_util');
const UserConstants = require('../constants/user_constants');

const UserActions = {

  getUser(id) {
    UserApiUtil.getUser(id, this.receiveUser, ErrorActions.setErrors);
  },

  receiveFollow(follow) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_FOLLOW_TOGGLE,
      follow: follow
    });
  },

  receiveUser(user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_USER,
      user: user
    });
  },

  toggleFollow(user) {
    FollowApiUtil.toggleFollow(user, this.receiveFollow, ErrorActions.setErrors);
  },

  updateUser(user) {
    UserApiUtil.updateUser(user, this.receiveUser, ErrorActions.setErrors);
  }
};

module.exports = UserActions;
