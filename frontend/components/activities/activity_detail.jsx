// react requires
const hashHistory         = require('react-router').hashHistory;
const React               = require('react');
const ReactDOM            = require('react-dom');
const Link = require('react-router').Link;

// project requires
const ActivityActions     = require('../../actions/activity_actions');
const ActivityCreationMap = require('./activity_creation_map');
const ActivityStore       = require('../../stores/activity_store');
const ActivityTypeActions = require('../../actions/activity_type_actions');
const ActivityTypeStore   = require('../../stores/activity_type_store');
const ErrorStore          = require('../../stores/error_store');
const FormErrors          = require('../errors/form_errors');

const ActivityDetail = React.createClass({

  render() {
    let datetime = new Date(this.props.activity.date);

    let date = datetime.toLocaleDateString();
    let time = datetime.toLocaleTimeString();

    let duration = this.durationString();

    let milePaceStr = this.paceString();

    return (

      <section className="activity group">
        <header>
          <h1>
            <Link className="text-link" to={`/users/${this.props.activity.user.id}`}>
              {this.props.activity.user.name}
            </Link> - {this.props.activity.activity_type.name}
          </h1>
        </header>
        <div className="activity-main group">
          <div className="activity-left">
            <div className="activity-avatar-med">
              <img src={this.props.activity.user.avatar_url} />
            </div>
            <div className="activity-detail">
              <div className="activity-detail-row">
                <h3 className="small-grey-text">{time} on {date}</h3>
              </div>
              <div className="activity-detail-row">
                <h1>{this.props.activity.title}</h1>
              </div>
              <div className="activity-detail-row">
                <p>{this.props.activity.description}</p>
              </div>
            </div>
          </div>
          <div className="activity-right">
            <div className="activity-detail-row group">
              <div className="activity-stat group">
                <p>{duration}</p>
                <p className="small-grey-text">Duration</p>
              </div>
              <div className="activity-stat group">
                <p>{this.props.activity.distance} mi</p>
                <p className="small-grey-text">Distance</p>
              </div>
              <div className="activity-stat group">
                <p>{milePaceStr} / mi</p>
                <p className="small-grey-text">Speed</p>
              </div>
            </div>
            <a className="button" href={this.props.activity.gpx_url} >Export as GPX</a>
          </div>
        </div>
      </section>
    );
  },

  durationString() {
    let duration = this.props.activity.duration;
    let ss = duration % 60;
    let mm = Math.floor(duration /= 60) % 60;
    let hh = Math.floor(duration / 60);
    return `${hh}:${("00" + mm).slice(-2)}:${("00" + ss).slice(-2)}`;
  },

  paceString() {

    let milePace = Math.floor(this.props.activity.duration / this.props.activity.distance);

    let mileStr = "";

    let ss = milePace % 60;
    let mm = Math.floor(milePace /= 60) % 60;
    let hh = Math.floor(milePace / 60);
    if (hh > 0) {
      mileStr += `${hh}:`;
    }
    return mileStr + `${("00" + mm).slice(-2)}:${("00" + ss).slice(-2)}`;
  }


});

module.exports = ActivityDetail;
