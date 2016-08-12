// react requires
const React           = require('react');
const Link = require('react-router').Link;


const ActivityItem = React.createClass({

  render() {

    let datetime = new Date(this.props.activity.date);
    let date = datetime.toLocaleDateString();
    let time = datetime.toLocaleTimeString();
    let duration = this.durationString();

    return (
      <li className="activity-item group">

        <div className="activity-item-avatar">
          <Link to={"/profile"} className="user-avatar-outside-padding" >
            <div className="user-avatar small">
              <img
                src={ this.props.activity.user.avatar_url } />
            </div>
          </Link>
        </div>

        <div className="activity-item-info">
          <div className="activity-detail-row">
            <h3 className="small-grey-text">{time} on {date}</h3>
          </div>
          <div className="activity-detail-row">
            <Link to={`/activities/${this.props.activity.id}`} className="text-link">
              <h1>{this.props.activity.title}</h1>
            </Link>
          </div>
          <div className="activity-detail-row">
            <Link to={`/users/${this.props.activity.user.id}`} className="text-link">
              <h5>{this.props.activity.user.name}</h5>
            </Link>
          </div>
          <div className="activity-detail-row">
            <h5>{duration}</h5><h5>{this.props.activity.distance} mi</h5><h5>{this.paceString()} / mi</h5>
          </div>
        </div>

        <img className="minimap"
          src={`https://maps.googleapis.com/maps/api/staticmap?size=300x150&path=color:0x003A23%7Cenc:${this.props.activity.encoded_polyline}&key=AIzaSyDL_NuEJQOvYtPxbTALLDl_sku6ZioowKQ`}>
        </img>

      </li>
    );
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
  },

  durationString() {
    let duration = this.props.activity.duration;
    let ss = duration % 60;
    let mm = Math.floor(duration /= 60) % 60;
    let hh = Math.floor(duration / 60);
    return `${hh}:${("00" + mm).slice(-2)}:${("00" + ss).slice(-2)}`;
  }

});

module.exports = ActivityItem;
