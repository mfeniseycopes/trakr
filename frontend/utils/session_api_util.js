// provides api calls for bench actions
const SessionApiUtil = {

  signup(user, successCallback, errorCallback) {

    $.ajax({
      method: "POST",
      url: "/api/users",
      dataType: "json",
      data: { "user": user },
      error(res) {
        errorCallback("signup", res);
      },
      success(res) {
        successCallback(res);
      }
    });
  },

  login(email, password, successCallback, errorCallback) {

    $.ajax({
      method: "POST",
      url: "/api/session",
      dataType: "json",
      data:
      {
        "email": email,
        "password": password
      },
      error(res) {
        errorCallback("login", res);
      },
      success(res) {
        successCallback(res);
      }
    });
  },

  logout(successCallback, errorCallback) {

    $.ajax({
      method: "DELETE",
      url: "/api/session",
      dataType: "json",
      error(res) {
        errorCallback("logout", res);
      },
      success(res) {
        successCallback(res);
      }
    });
  }

};

module.exports = SessionApiUtil;
