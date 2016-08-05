const AppDispatcher = require('../dispatchers/dispatcher');
const ErrorActions = require('../actions/error_actions');
const ActivityApiUtil = require('../utils/user_api_util');
const ActivityConstants = require('../constants/user_constants');

const ActivityActions = {


  createActivity(activity) {
    ActivityApiUtil.createActivity(activity, this.receiveActivity, ErrorActions.setErrors);
  },

  destroyActivity(id) {
    ActivityApiUtil.destroyActivity(id, this.receiveActivity, ErrorActions.setErrors);
  },

  getActivity(id) {
    ActivityApiUtil.getActivity(id, this.receiveActivity, ErrorActions.setErrors);
  },

  getActivities() {
    ActivityApiUtil.getActivities(this.receiveActivity, ErrorActions.setErrors);
  },

  receiveActivities(activities) {
    AppDispatcher.dispatch({
      actionType: ActivityConstants.RECEIVE_ACTIVITIES,
      activities: activities
    });
  },

  receiveActivity(activity) {
    AppDispatcher.dispatch({
      actionType: ActivityConstants.RECEIVE_ACTIVITY,
      activity: activity
    });
  },

  removeActivity(activity) {
    AppDispatcher.dispatch({
      actionType: ActivityConstants.REMOVE_ACTIVITY,
      activity: activity
    });
  },

  updateActivity(activity) {
    ActivityApiUtil.updateActivity(activity, this.receiveActivity, ErrorActions.setErrors);
  }
};

module.exports = ActivityActions;