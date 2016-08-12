// react requires
const React           = require('react');

// project requires
const UserStore    = require('../../stores/user_store');

const Progress = React.createClass({

  render() {

    return (
      <section className="progress-pane">
        <h1>Weekly Progress</h1>
        <div className="week-stat">
          <h2>Run</h2>
          <div>
            <p>{this.props.weekStats.run.count} activities</p>
            <p>{Math.floor(this.props.weekStats.run.duration / 3600)} hrs</p>
            <p>{this.props.weekStats.run.distance} miles</p>
          </div>
        </div>
        <div className="week-stat">
          <h2>Ride</h2>
          <div>
              <p>{this.props.weekStats.ride.count} activities</p>
              <p>{Math.floor(this.props.weekStats.ride.duration / 3600)} hrs</p>
              <p>{this.props.weekStats.ride.distance} miles</p>
          </div>
        </div>
        <div className="week-stat">
          <h2>Other</h2>
          <div>
              <p>{this.props.weekStats.other.count} activities</p>
              <p>{Math.floor(this.props.weekStats.other.duration / 3600)} hrs</p>
              <p>{this.props.weekStats.other.distance} miles</p>
          </div>
        </div>
      </section>
    );
  }

});

module.exports = Progress;
