const AppDispatcher = require('../dispatchers/dispatcher');
const ErrorActions = require('../actions/error_actions');
const ActivityTypeApiUtil = require('../utils/activity_type_api_util');
const ActivityTypeConstants = require('../constants/activity_type_constants');

const ActivityTypeActions = {

  getActivityTypes() {
    ActivityTypeApiUtil.getActivityTypes(this.receiveActivityTypes, ErrorActions.setErrors);
  },

  receiveActivityTypes(activity_types) {
    AppDispatcher.dispatch({
      actionType: ActivityTypeConstants.RECEIVE_ACTIVITY_TYPES,
      activityTypes: activity_types
    });
  }

};

module.exports = ActivityTypeActions;
