// react
const Store = require('flux/utils').Store;

// project
const ActivityConstants = require('../constants/activity_constants');
const AppDispatcher = require('../dispatchers/dispatcher');
const ErrorConstants = require('../constants/error_constants');

const ActivityStore = new Store(AppDispatcher);

// instance vars
let _activities = {};

ActivityStore.all = () => {
  let keys = Object.keys(_activities);

  return keys.map((key) => {
    return _activities[key];
  });
};

ActivityStore.find = (id) => {
  return _activities[id];
};

ActivityStore.__onDispatch = (payload) => {
  switch(payload.actionType) {
    case ActivityConstants.RECEIVED_ACTIVITIES:
    ActivityStore.resetActivities(payload.activities);
    break;

    case ActivityConstants.RECEIVED_ACTIVITY:
    ActivityStore.resetActivity(payload.activity);
    break;

    case ActivityConstants.REMOVED_ACTIVITY:
    ActivityStore.removeActivity(payload.activity);
    break;
  }
};

ActivityStore.removeActivity = (activity) => {
  delete _activites[activity.id];
  ActivityStore.__emitChange();
};

ActivityStore.resetActivities = (activities) => {

  _activities = {};

  activities.forEach((activity) => {
    _activities[activity.id] = activity;
  });

  ActivityStore.__emitChange();
};

ActivityStore.resetActivity = (activity) => {
  _activities[activity.id] = activity;

  ActivityStore.__emitChange();
};

module.exports = ActivityStore;
