const FollowApiUtil = {

  toggleFollow(user, successCallback, errorCallback) {

    debugger

    $.ajax({
      method: user.following ? "DELETE" : "POST",
      url: `/api/users/${user.id}/follow`,
      dataType: "json",
      error(res) {
        errorCallback("follow", res.responseJSON);
      },
      success(res) {
        successCallback(res);
      }
    });
  },

  unfollow(id, successCallback, errorCallback) {
    $.ajax({
      method: "DELETE",
      url: `/api/users/${id}/follow`,
      dataType: "json",
      error(res) {
        errorCallback("follow", res.responseJSON);
      },
      success(res) {
        successCallback(res);
      }
    });
  }

};

module.exports = FollowApiUtil;
