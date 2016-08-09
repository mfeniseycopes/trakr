// react requires
const hashHistory         = require('react-router').hashHistory;
const React               = require('react');

// project requires
const ActivityActions     = require('../../actions/activity_actions');
const ActivityCreationMap = require('./activity_creation_map');
const ActivityStore       = require('../../stores/activity_store');
const ActivityTypeActions = require('../../actions/activity_type_actions');
const ActivityTypeStore   = require('../../stores/activity_type_store');
const ErrorActions        = require('../../actions/error_actions');
const ErrorStore          = require('../../stores/error_store');
const FormErrors          = require('../errors/form_errors');

const ActivityForm = React.createClass({

  activityTypeOptions() {
    return this.state.activityTypes.map((activityType) => {

      return (
        <option value={activityType.id} key={activityType.id} >
          {activityType.name}
        </option>
      );

    });
  },

  addActivityTypes() {
    this.setState({ activityTypes: ActivityTypeStore.all() });
  },

  addErrors() {
    this.setState({ errors: ErrorStore.errors("activityForm") });
  },

  changeDurationAndSpeed() {
    let duration = (this.state.durationHH * 360 + this.state.durationMM * 60 + this.state.durationSS);
    this.setState({ duration: duration, speed: duration / this.state.distance });
  },

  changeFile(e) {
    var file = e.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = function () {
      this.setState({ gpxFile: file });
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    }
  },

  change(property, callback) {

    return (e) => {
      this.setState({[property]: e.target.value}, callback);
    };
  },

  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.addErrors);

    // goto detail page when activity is persisted
    this.activityListener = ActivityStore.addListener(this.gotoActivityDetail);

    // populate activityType dropdown
    this.activityTypeListener =
      ActivityTypeStore.addListener(this.addActivityTypes);
    ActivityTypeActions.getActivityTypes();
  },

  componentWillUnmount() {
    this.deregisterListeners();
  },

  deregisterListeners() {
    this.errorListener.remove();
    this.activityTypeListener.remove();
  },

  getInitialState() {

    // load activity from props
    if (this.props.activity) {
      return _persistedActivity(this.props.activity);
    }
    // load activity details from creation method
    else if (this.props.location.pathname === "/new-activity") {

      let state = _blankActivity();

      if (this.props.location.query.from === "creator") {
        let activity = ActivityStore.newActivity();
        state.distance = activity.distance;
        state.route = activity.route;
        state.encodedPolyline = activity.encodedPolyline;
      }
      else if (this.props.location.query.from === "upload") {
        // TODO: get info from gpx file
      }

      return state;
    }
  },

  handleSubmit(e) {

    e.preventDefault();
    // format date
    let date = new Date(this.state.date + " " + this.state.start);

    let activity = {
      activity_type_id: this.state.activityType,
      date: date.toJSON(),
      description: this.state.description,
      duration: this.state.duration,
      title: this.state.title
    };
    // TODO: let this happen
    // if (this.state.gpxFile) {
    //   activity = new FormData();
    //   formData.append("activity[gpx]", this.state.gpxFile);
    //   formData.append("activity[activity_type_id]", this.state.activityType);
    //   formData.append("activity[description]", this.state.description);
    //   formData.append("activity[duration]", this.state.duration);
    //   formData.append("activity[distance]", this.state.distance);
    //   formData.append("activity[encoded_polyline]", this.state.encodedPolyline);
    //   formData.append("activity[title]", this.state.title);
    // } else if (this.state.route) {

    if (this.state.mode === "create") {

      activity.distance = this.state.distance;
      activity.encoded_polyline = this.state.encodedPolyline;
      activity.route = this.state.route;

      ActivityActions.createActivity(activity);
    }
    else if (this.state.mode === "edit") {
      activity.id = this.state.id;

      ActivityActions.updateActivity(activity);
    }

  },

  miniMapUrl() {
    return `https://maps.googleapis.com/maps/api/staticmap?size=300x200&path=color:0x003A23%7Cenc:${this.state.encodedPolyline}&key=AIzaSyDL_NuEJQOvYtPxbTALLDl_sku6ZioowKQ`;
  },

  gotoActivityDetail() {

    if (this.state.mode === "edit") {

    }
    else if (this.state.mode === "create" && ActivityStore.newActivity().id) {
      hashHistory.push(`/activities/${ActivityStore.newActivity().id}`);
    }
  },

  render() {

    return(
      <div>
        <p>{ this.state.distance } mi</p>

        <img className="mini-map" src={ this.miniMapUrl() } />

        <form className="activity-form" onSubmit={this.handleSubmit}>

          <select name="Type"
            value={this.state.activityType}
            onChange={this.change("activityType")}>
            {
              this.state.activityTypes.length > 0 ?
              this.activityTypeOptions() : ""
            }
          </select>

          <input type="text"
            onChange={this.change("title")}
            value={this.state.title}
            placeholder="Title" />

          <input type="date"
            onChange={this.change("date")}
            value={this.state.date}/>

          <input type="time"
            onChange={this.change("start")}
            value={this.state.start} />

          <input type="number"
            onChange={this.change("durationHH", this.changeDurationAndSpeed)}
            value={this.state.durationHH}
            placeholder="HH" />
          <input type="number"
            onChange={this.change("durationMM", this.changeDurationAndSpeed)}
            value={this.state.durationMM}
            placeholder="MM" />
          <input type="number"
            onChange={this.change("durationSS", this.changeDurationAndSpeed)}
            value={this.state.durationSS}
            placeholder="SS" />

          <textarea
            onChange={this.change("description")}
            value={this.state.description}
            placeholder="Description" />

          <input type="file"
            onChange={this.changeFile} />

          <FormErrors errors={ this.state.errors } />

          <button className="button" type="submit">Save</button>

        </form>
      </div>
    );
  }

});

let _blankActivity = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = ("00" + date.getMonth()).slice(-2);
  let day = ("00" + date.getDate()).slice(-2);
  let hh = ("00" + date.getHours()).slice(-2);
  let mm = ("00" + date.getMinutes()).slice(-2);

  return {
    activityType: 1,
    date: `${year}-${month}-${day}`,
    description: "",
    distance: 0,
    duration: 0,
    durationHH: "",
    durationMM: "",
    durationSS: "",
    encodedPolyline: "",
    gpxFile: null,
    start: `${hh}:${mm}`,
    title: "My Activity",
    route: null,
    speed: 0,
    activityTypes: [],
    errors: [],
    mode: "create"
  };
};

let _durations = (duration) => {
  return {
    hh: Math.floor(duration / 360),
    mm: Math.floor(duration / 60) % 60,
    ss: duration % 60
  };
};

let _persistedActivity = (activity) => {

  let date = new Date(activity.date);
  let year = date.getFullYear();
  let month = ("00" + date.getMonth()).slice(-2);
  let day = ("00" + date.getDate()).slice(-2);
  let hh = ("00" + date.getHours()).slice(-2);
  let mm = ("00" + date.getMinutes()).slice(-2);

  let durations = _durations(activity.duration);

  return {
    activityType: activity.activity_type.id,
    date: `${year}-${month}-${day}`,
    description: activity.description,
    distance: activity.distance,
    duration: activity.duration,
    durationHH: durations.hh,
    durationMM: durations.mm,
    durationSS: durations.ss,
    encodedPolyline: activity.encoded_polyline,
    gpxFile: null,
    id: activity.id,
    start: `${hh}:${mm}`,
    title: activity.title,
    route: null,
    speed: activity.speed,
    activityTypes: [],
    errors: [],
    mode: "edit"
  };
};


module.exports = ActivityForm;
