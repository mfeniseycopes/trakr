// provides api calls for activity actions
const ActivityApiUtil = {

  createActivity(activity, successCallback, errorCallback) {
    $.ajax({
      method: "POST",
      url: `/api/activities`,
      dataType: "json",
      data: { activity: activity },
      error(res) {
        errorCallback("activityForm", res.responseJSON);
      },
      success(res) {
        successCallback(res);
      }
    });

  },

  destroyActivity(id, successCallback, errorCallback) {

    $.ajax({
      method: "DELETE",
      url: `/api/activities/${id}`,
      dataType: "json",
      error(res) {
        errorCallback("activityDelete", res.responseJSON);
      },
      success(res) {
        successCallback(res);
      }
    });
  },

  getActivity(id, successCallback, errorCallback) {

    $.ajax({
      method: "GET",
      url: `/api/activities/${id}`,
      dataType: "json",
      error(res) {
        errorCallback("activity", res.responseJSON);
      },
      success(res) {
        successCallback(res);
      }
    });
  },

  getActivities(successCallback, errorCallback) {

    $.ajax({
      method: "GET",
      url: `/api/activities`,
      dataType: "json",
      error(res) {
        errorCallback("activity", res.responseJSON);
      },
      success(res) {
        successCallback(res);
      }
    });
  },

  getActivitiesByUser(id, successCallback, errorCallback) {

    $.ajax({
      method: "GET",
      url: `/api/users/${id}/activities`,
      dataType: "json",
      error(res) {
        errorCallback("activities", res.responseJSON);
      },
      success(res) {
        successCallback(res);
      }
    });
  },

  updateActivity(activity, successCallback, errorCallback) {
    let id = activity.id;
    delete activity.id;
    $.ajax({
      method: "PATCH",
      url: `/api/activities/${id}`,
      dataType: "json",
      data: { activity: activity },
      error(res) {
        errorCallback("activityForm", res.responseJSON);
      },
      success(res) {
        successCallback(res);
      }
    });
  }

};

module.exports = ActivityApiUtil;
