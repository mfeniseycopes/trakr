
const ActivityTypeApiUtil = {

  getActivityTypes(successCallback) {
    $.ajax({
      method: "GET",
      url: "/api/activity_types",
      dataType: "json",
      success(res) {
        successCallback(res);
      }
    })
  }

};

module.exports = ActivityTypeApiUtil;
