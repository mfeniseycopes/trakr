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
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Title</th>
              <th>Duration</th>
              <th>Distance</th>
              <th>Speed</th>
            </tr>
          </thead>
          <tbody>
            {
              this.rows()
            }
          </tbody>
        </table>
      </section>
    );
  },

  row(activity) {
    return (
      <tr key={activity.id}>
        <td>{activity.activity_type_name}</td>
        <td>{activity.date}</td>
        <td>{activity.title}</td>
        <td>{activity.duration}</td>
        <td>{activity.distance} mi</td>
        <td>{activity.speed} mph</td>
      </tr>
    );
  },

  rows() {
    return this.props.activities.map((activity) => { return this.row(activity); });
  }

});

module.exports = ActvitiesTable;
