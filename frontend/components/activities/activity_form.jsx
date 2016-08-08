// react requires
const hashHistory         = require('react-router').hashHistory;
const React               = require('react');

// project requires
const ActivityActions     = require('../../actions/activity_actions');
const ActivityCreationMap = require('./activity_creation_map');
const ActivityStore       = require('../../stores/activity_store');
const ActivityTypeActions = require('../../actions/activity_type_actions');
const ActivityTypeStore   = require('../../stores/activity_type_store');
const ErrorStore          = require('../../stores/error_store');
const FormErrors          = require('../errors/form_errors');

const ActivityForm = React.createClass({

  activityTypeOptions() {

    return this.state.activityTypes.map((activityType) => {
      return (
        <option value={activityType.id} key={activityType.id}>
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

  changeActivityType(e) {
    this.setState({ activityType: e.target.value });
  },

  changeDate(e) {
    this.setState({ date: e.target.value });
  },

  changeDescription(e) {
    this.setState({ description: e.target.value });
  },

  changeDurationHH(e) {
    let duration = (e.target.value * 360 +
      this.state.durationMM * 60 +
      this.state.durationSS);
    this.setState({ durationHH: e.target.value, speed: duration / this.state.distance });
  },

  changeDurationMM(e) {
    let duration = (this.state.durationHH * 360 +
      e.target.value * 60 +
      this.state.durationSS);
    this.setState({ durationMM: e.target.value, speed: duration / this.state.distance });
  },

  changeDurationSS(e) {
    let duration = (this.state.durationHH * 360 +
      this.state.durationMM * 60 +
      e.target.value);
    this.setState({ durationSS: e.target.value, speed: duration / this.state.distance });
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

  changeStart(e) {
    this.setState({ start: e.target.value });
  },

  changeTitle(e) {
    this.setState({ title: e.target.value });
  },

  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.addErrors);

    // goto detail page when activity is persisted
    this.activityListener = ActivityStore.addListener(this.redirectToActivityDetail);

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

  duration() {
    return this.state.durationHH * 360 +
      this.state.durationMM * 60 +
      this.state.durationSS;
  },

  getInitialState() {

    let date = new Date();
    let year = date.getFullYear();
    let month = ("00" + date.getMonth()).slice(-2);
    let day = ("00" + date.getDate()).slice(-2);
    let hh = ("00" + date.getHours()).slice(-2);
    let mm = ("00" + date.getMinutes()).slice(-2);

    let state = {
      activityType: 1,
      date: `${year}-${month}-${day}`,
      description: "",
      distance: 0,
      durationHH: "",
      durationMM: "",
      durationSS: "",
      encodedPolyline: "",
      gpxFile: null,
      start: `${hh}:${mm}`,
      title: "My Acivity",
      route: null,
      speed: 0,
      activityTypes: [],
      errors: []
    };

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
  },

  handleSubmit(e) {

    e.preventDefault();

    // format date
    let date = new Date(this.state.date + " " + this.state.start);

    let activity;

    if (this.state.gpxFile) {
      activity = new FormData();
      formData.append("activity[gpx]", this.state.gpxFile);
      formData.append("activity[activity_type_id]", this.state.activityType);
      formData.append("activity[description]", this.state.description);
      formData.append("activity[duration]", this.duration());
      formData.append("activity[distance]", this.state.distance);
      formData.append("activity[encoded_polyline]", this.state.encodedPolyline);
      formData.append("activity[title]", this.state.title);
    } else if (this.state.route) {
      activity = {
        activity_type_id: this.state.activityType,
        date: date.toJSON(),
        description: this.state.description,
        distance: this.state.distance,
        duration: this.duration(),
        encoded_polyline: this.state.encodedPolyline,
        route: this.state.route,
        title: this.state.title
      };
    }

    ActivityActions.createActivity(activity);
  },

  miniMapUrl() {
    return `https://maps.googleapis.com/maps/api/staticmap?size=300x200&path=color:0x003A23%7Cenc:${this.state.encodedPolyline}`;
  },

  redirectToActivityDetail() {
    if(ActivityStore.newActivity().id) {
      hashHistory.push(`/activities/${ActivityStore.newActivity().id}`);
    }
  },

  render() {

    return(
      <div>
        <p>{ this.state.distance } mi</p>

        <img className="mini-map" src={ this.miniMapUrl() } />

        <form className="activity-form" onSubmit={this.handleSubmit}>

          <select name="Type" onChange={this.changeActivityType}>
            <option value="" >--Type--</option>
            { this.state.activityTypes.length > 0 ? this.activityTypeOptions() : "" }
          </select>

          <input type="text"
            onChange={this.changeTitle}
            value={this.state.title}
            placeholder="Title" />

          <input type="date"
            onChange={this.changeDate}
            value={this.state.date}/>

          <input type="time"
            onChange={this.changeStart}
            value={this.state.start} />

          <input type="num"
            onChange={this.changeDurationHH}
            value={this.state.durationHH}
            placeholder="HH" />
          <input type="num"
            onChange={this.changeDurationMM}
            value={this.state.durationMM}
            placeholder="MM" />
          <input type="num"
            onChange={this.changeDurationSS}
            value={this.state.durationSS}
            placeholder="SS" />

          <textarea
            onChange={this.changeDescription}
            value={this.state.description}
            placeholder="Description" />

          <input type="file"
            onChange={this.changeFile} />

          <FormErrors errors={ this.state.errors } />

          <button type="submit">Add Activity</button>

        </form>
      </div>
    );
  }

});


module.exports = ActivityForm;
