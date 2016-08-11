// react
const Store = require('flux/utils').Store;

// project
const ActivityConstants = require('../constants/activity_constants');
const AppDispatcher = require('../dispatchers/dispatcher');
const ErrorConstants = require('../constants/error_constants');

const ActivityStore = new Store(AppDispatcher);

// instance vars
let _activities = {};
let _orderedActivities = [];
let _newActivity = {};

ActivityStore.all = () => {
  // let keys = Object.keys(_activities);
  //
  // return keys.map((key) => {
  //   return _activities[key];
  // });
  return _orderedActivities;
};

ActivityStore.find = (id) => {
  return _retrieveActivity(id);
  // return _activities[id];
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
  // delete _activites[activity.id];
  _deleteActivity(id);

  ActivityStore.__emitChange();
};

ActivityStore.resetActivities = (activities) => {

  // _activities = {};
  //
  // activities.forEach((activity) => {
  //   _activities[activity.id] = activity;
  // });

  _orderedActivities = activities;

  ActivityStore.__emitChange();
};

ActivityStore.resetActivity = (activity) => {
  // _activities[activity.id] = activity;
  _updateActivity(activity);

  ActivityStore.__emitChange();
};

ActivityStore.resetNewActivity = (activity) => {
  _newActivity = activity;

  // add to store if persisted
  // if (activity.id) {
  //   _activities[activity.id] = activity;
  // }
  _orderedActivities.push(activity);

  ActivityStore.__emitChange();
};

let _deleteActivity = (id) => {
  let idx = _findActivityIndex(id);

  delete _orderedActivities[idx];
};

let _findActivityIndex = (id) => {
  for (let i = 0; i < _orderedActivities.length; i++) {
    if (_orderedActivities[i].id === id) {
      return i;
    }
  }
};

let _updateActivity = (activity) => {
  let idx = _findActivityIndex(activity.id);

  _orderedActivities[idx] = activity;
};

let _retrieveActivity = (id) => {
  let idx = _findActivityIndex(id);

  return _orderedActivities[idx];
};

module.exports = ActivityStore;
