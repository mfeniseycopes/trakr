const SessionStore = require('../stores/session_store');

// provides api calls for user actions
const UserApiUtil = {

  getDashboard(successCallback, errorCallback) {

    $.ajax({
      method: "GET",
      url: `/api/users/${SessionStore.currentUser().id}`,
      dataType: "json",
      data: { dashboard: true },
      error(res) {
        errorCallback("dashboard", res.responseJSON);
      },
      success(res) {
        successCallback(res);
      }
    });
  },

  getUser(id, successCallback, errorCallback) {
    $.ajax({
      method: "GET",
      url: `/api/users/${id}`,
      dataType: "json",
      error(res) {
        errorCallback("user", res.responseJSON);
      },
      success(res) {
        successCallback(res);
      }
    });
  },

  updateUser(user, successCallback, errorCallback) {

    $.ajax({
      method: "PATCH",
      url: `/api/users/${user.id}`,
      dataType: "json",
      data: { user: user },
      error(res) {
        errorCallback("userForm", res.responseJSON);
      },
      success(res) {
        successCallback(res);
      }
    });
  }

};

module.exports = UserApiUtil;
