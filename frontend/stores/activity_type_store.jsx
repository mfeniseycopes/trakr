// react
const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatchers/dispatcher');

// project
const ActivityTypeConstants = require('../constants/activity_type_constants');

// instance variable
let _activityTypes = {};

const ActivityTypeStore = new Store(AppDispatcher);

ActivityTypeStore.all = () => {
  let keys = Object.keys(_activityTypes);

  return keys.map((key) => {
    return _activityTypes[key];
  });
};

ActivityTypeStore.__onDispatch = (payload) => {
  switch(payload.actionType) {
    case ActivityTypeConstants.RECEIVE_ACTIVITY_TYPES:
    ActivityTypeStore.resetActivityTypes(payload.activityTypes);
    break;
  }
};

ActivityTypeStore.resetActivityTypes = (activityTypes) => {
  _activityTypes = {};

  activityTypes.forEach((activityType) => {
    _activityTypes[activityType.id] = activityType;
  })

  ActivityTypeStore.__emitChange();
};

module.exports = ActivityTypeStore;
