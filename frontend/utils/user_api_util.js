// provides api calls for user actions
const UserApiUtil = {

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
