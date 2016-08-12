// react requires
const React           = require('react');
const Link = require('react-router').Link;



const ActivityTable = React.createClass({

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
        <td>
          <Link to={`/activities/activity.id`} title="See more info">{activity.title}</Link>
        </td>
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

module.exports = ActivityTable;
