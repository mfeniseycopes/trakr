// react requires
const React           = require('react');
const Link = require('react-router').Link;



const ActivityTable = React.createClass({

  render() {
    return (
      <section className="activities-table">
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

    let datetime = new Date(activity.date);

    let date = datetime.toLocaleDateString();
    let time = datetime.toLocaleTimeString();

    let duration = this.durationString(activity);

    return (
      <tr key={activity.id}>
        <td>{activity.activity_type_name}</td>
        <td>{date}</td>
        <td>
          <Link to={`/activities/${activity.id}`} className="text-link" title="See more info">{activity.title}</Link>
        </td>
        <td>{duration}</td>
        <td>{activity.distance.toPrecision(2)} mi</td>
        <td>{activity.speed.toPrecision(2)} mph</td>
      </tr>
    );
  },

  rows() {
    return this.props.activities.map((activity) => { return this.row(activity); });
  },


  durationString(activity) {
    let duration = activity.duration;
    let ss = duration % 60;
    let mm = Math.floor(duration /= 60) % 60;
    let hh = Math.floor(duration / 60);
    return `${hh}:${("00" + mm).slice(-2)}:${("00" + ss).slice(-2)}`;
  }

});

module.exports = ActivityTable;
