// project
const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatchers/dispatcher');
const UserConstants = require('../constants/user_constants');

const UserStore = new Store(AppDispatcher);

let _user = {};

UserStore.__onDispatch = (payload) => {
  switch(payload.actionType) {
    case UserConstants.RECEIVE_USER:
    UserStore.resetUser(payload.user);
    break;
  }
};

UserStore.resetUser = (user) => {
  _user = user;
  UserStore.__emitChange();
};

UserStore.user = () => {
  return Object.assign({}, _user);
};

module.exports = UserStore;
