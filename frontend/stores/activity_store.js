// react
const Store = require('flux/utils').Store;

// project
const ActivityConstants = require('../constants/activity_constants');
const AppDispatcher = require('../dispatchers/dispatcher');
const ErrorConstants = require('../constants/error_constants');

const ActivityStore = new Store(AppDispatcher);

// instance vars
let _orderedActivities = [];
let _newActivity = {};

ActivityStore.all = () => {
  return _orderedActivities;
};

ActivityStore.find = (id) => {
  return _retrieveActivity(id);
};

ActivityStore.__onDispatch = (payload) => {
  switch(payload.actionType) {
    case ActivityConstants.RECEIVE_ACTIVITIES:
    ActivityStore.resetActivities(payload.activities);
    break;

    case ActivityConstants.RECEIVE_ACTIVITY:
    ActivityStore.resetActivity(payload.activity);
    break;

    case ActivityConstants.RECEIVE_NEW_ACTIVITY:
    ActivityStore.resetNewActivity(payload.activity);
    break;

    case ActivityConstants.REMOVE_ACTIVITY:
    ActivityStore.removeActivity(payload.activity);
    break;
  }
};

ActivityStore.newActivity = () => {
  return Object.assign({}, _newActivity);
};

ActivityStore.removeActivity = (activity) => {
  _deleteActivity(activity.id);

  ActivityStore.__emitChange();
};

ActivityStore.resetActivities = (activities) => {

  _orderedActivities = activities.map((activity) => {
    return activity;
  });

  ActivityStore.__emitChange();
};

ActivityStore.resetActivity = (activity) => {
  _updateActivity(activity);

  ActivityStore.__emitChange();
};

ActivityStore.resetNewActivity = (activity) => {
  _newActivity = activity;

  _orderedActivities.push(activity);

  ActivityStore.__emitChange();
};

let _deleteActivity = (id) => {
  let idx = _findActivityIndex(id);

  _orderedActivities.splice(idx, 1);
};

let _findActivityIndex = (id) => {
  for (let i = 0; i < _orderedActivities.length; i++) {
    if (_orderedActivities[i].id === id) {
      return i;
    }
  }

  return -1;
};

let _updateActivity = (activity) => {
  let idx = _findActivityIndex(activity.id);

  if (idx !== -1) {
    _orderedActivities[idx] = activity;
  }
  else {
    _orderedActivities.push(activity);
  }

};

let _retrieveActivity = (id) => {
  let idx = _findActivityIndex(id);

  if (idx !== -1) {
    return _orderedActivities[idx];
  }
  else {
    return null;
  }
};

module.exports = ActivityStore;
