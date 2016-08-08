const AppDispatcher = require('../dispatchers/dispatcher');
const ErrorActions = require('../actions/error_actions');
const ActivityApiUtil = require('../utils/activity_api_util');
const ActivityConstants = require('../constants/activity_constants');

const ActivityActions = {


  createActivity(activity) {
    debugger
    ActivityApiUtil.createActivity(activity, this.receiveNewActivity, ErrorActions.setErrors);
  },

  // used to send new (non-persisted) activity to activity form
  createNewActivity(activity) {
    AppDispatcher.dispatch({
      actionType: ActivityConstants.RECEIVE_NEW_ACTIVITY,
      activity: activity
    });
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

  receiveNewActivity(activity) {
    AppDispatcher.dispatch({
      actionType: ActivityConstants.RECEIVE_NEW_ACTIVITY,
      activity: activity
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
