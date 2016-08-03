// provides api calls for user actions
const UserApiUtil = {

  getUser(id, successCallback, errorCallback) {

    $.ajax({
      method: "GET",
      url: `/api/users/${id}`,
      dataType: "json",
      error(form, res) {
        errorCallback("user", res.responseJSON);
      },
      success(res) {
        successCallback(res);
      }
    });
  }

};

module.exports = UserApiUtil;
