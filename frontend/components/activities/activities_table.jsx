// react requires
const React           = require('react');

// project requires
const ActivityStore   = require('../../stores/user_store');
const ErrorStore      = require('../../stores/error_store');
const SessionStore    = require('../../stores/session_store');

const ActvitiesTable = React.createClass({

  render() {
    return (
      <section className="activities-table">
        Activities Table
        <table>
          <tr>
            <th>Type</th>
            <th>Date</th>
            <th>Title</th>
            <th>Duration</th>
            <th>Distance</th>
            <th>Speed</th>
          </tr>
          {
            this.rows()
          }
        </table>
      </section>
    );
  },

  row(activity) {
    return (
      <tr>
        <th>{activity.activity_type.name}</th>
        <th>{activity.date}</th>
        <th>{activity.title}</th>
        <th>{activity.duration}</th>
        <th>{activity.distance} mi</th>
        <th>{activity.speed} mph</th>
      </tr>
    );
  },

  rows() {
    return this.props.activities.map((activity) => { return this.row(activity); });
  }

});

module.exports = ActvitiesTable;
