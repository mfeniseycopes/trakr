// react
const Store = require('flux/utils').Store;

// project
const AppDispatcher = require('../dispatchers/dispatcher');
const ErrorConstants = require('../constants/error_constants');

// instance vars
let _errors = [];
let _form = "";

const ErrorStore = new Store(AppDispatcher);

ErrorStore.clearErrors = () => {
  _errors = [];
  ErrorStore.__emitChange();
};

// return errors to matching form
ErrorStore.errors = (form) => {
  if (form === _form) {
    return _errors.slice();
  } else {
    return [];
  }
};

ErrorStore.__onDispatch = (payload) => {

  switch(payload.actionType) {
    case ErrorConstants.SET_ERRORS:
    ErrorStore.setErrors(payload);
    break;

    case ErrorConstants.CLEAR_ERRORS:
    ErrorStore.clearErrors();
    break;
  }
};

ErrorStore.setErrors = (payload) => {
  _errors = payload.errors || [];
  _form = payload.form;
  ErrorStore.__emitChange();
};


module.exports = ErrorStore;
