// project
const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatchers/dispatcher');
const UserConstants = require('../constants/user_constants');

const UserStore = new Store(AppDispatcher);

let _users = [];

UserStore.all = () => {
  return _users;
};

UserStore.__onDispatch = (payload) => {
  switch(payload.actionType) {
    case UserConstants.RECEIVE_FOLLOW_TOGGLE:
    UserStore.followToggle(payload.follow.followee_id);
    break;

    case UserConstants.RECEIVE_USER:
    UserStore.resetUser(payload.user);
    break;

    case UserConstants.RECEIVE_USERS:
    UserStore.resetUsers(payload.users);
    break;
  }
};

UserStore.resetUser = (user) => {
  _updateUser(user);
  UserStore.__emitChange();
};

UserStore.resetUsers = (users) => {
  _users = users;
  UserStore.__emitChange();
};

UserStore.followToggle = (id) => {
  let user = _retrieveUser(id);
  user.following = !user.following;
  UserStore.__emitChange();
};

UserStore.user = (id) => {

  return Object.assign({}, _retrieveUser(id));
};

let _deleteUser = (id) => {
  let idx = _findUserIndex(id);

  delete _users[idx];
};

let _findUserIndex = (id) => {

  for (let i = 0; i < _users.length; i++) {
    if (_users[i].id === id) {
      return i;
    }
  }
};

let _updateUser = (user) => {

  let idx = _findUserIndex(user.id);

  _users[idx] = user;
};

let _retrieveUser = (id) => {

  let idx = _findUserIndex(id);
  let user = _users[idx];
  return user;
};





module.exports = UserStore;
