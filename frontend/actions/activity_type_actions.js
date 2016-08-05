const AppDispatcher = require('../dispatchers/dispatcher');
const ErrorActions = require('../actions/error_actions');
const ActivityTypeApiUtil = require('../utils/activity_type_api_util');
const ActivityTypeConstants = require('../constants/activity_type_constants');

const ActivityTypeActions = {

  getActivityType(id) {
    ActivityTypeApiUtil.getActivityType(id, this.receiveActivityType, ErrorActions.setErrors);
  },

  receiveActivityType(activity_type) {
    AppDispatcher.dispatch({
      actionType: ActivityTypeConstants.RECEIVE_ACTIVITY_TYPES,
      activity_type: activity_type
    });
  }

};

module.exports = ActivityTypeActions;
