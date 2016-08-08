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

  changeDescription(e) {
    this.setState({ description: e.target.value });
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

  changeTitle(e) {
    this.setState({ title: e.target.value });
  },

  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.addErrors);

    // populate activityType dropdown
    this.activityTypeListener = ActivityTypeStore.addListener(this.addActivityTypes);
    ActivityTypeActions.getActivityTypes();

    // get route info from prepopulated activity
  },

  componentWillUnmount() {
    this.deregisterListeners();
  },

  deregisterListeners() {
    this.errorListener.remove();
    this.activityTypeListener.remove();
  },

  getInitialState() {
    let state = {
      activityType: null,
      description: "",
      distance: 0,
      duration: 0,
      encPolyline: "",
      gpxFile: null,
      title: "",
      route: null,
      activityTypes: [],
      errors: []
    };

    if (this.props.location.query.from === "creator") {
      let activity = ActivityStore.newActivity();
      state.distance = activity.distance;
      state.route = activity.route;
      state.encPolyline = activity.encPolyline;
    }
    else if (this.props.location.query.from === "upload") {
      // state.gpxFile = ??
    }
    else {
      activity = {
        activityType: null,
        description: "",
        distance: 0,
        gpxFile: null,
        title: ""
      };
    }

    return state;
  },

  handleSubmit() {

    let activity;
    if (this.state.gpxFile) {
      activity = new FormData();
      formData.append("activity[gpx]", this.state.gpxFile);
      formData.append("activity[activity_type_id]", this.state.activityType);
      formData.append("activity[description]", this.state.description);
      formData.append("activity[distance]", this.state.distance);
      formData.append("activity[enc_polyline]", this.state.encPolyline);
      formData.append("activity[title]", this.state.title);
    } else if (this.state.route) {
      activity = {
        activity_type_id: this.state.activityType,
        description: this.state.description,
        distance: this.state.distance,
        enc_polyline: this.state.encPolyline,
        route: this.state.route,
        title: this.state.title
      };
    }

    ActivityActions.createActivity(activity);
  },

  miniMapUrl() {
    return `https://maps.googleapis.com/maps/api/staticmap?size=300x200&path=color:0x003A23%7Cenc:${this.state.encPolyline}`;
  },

  render() {

    return(
      <div>
        <p>{ this.state.distance }</p>

        <img className="mini-map" src={ this.miniMapUrl() } />

        <form onSubmit={this.handleSubmit}>

          <select name="Type" onChange={this.changeActivityType}>
            <option value="" >--Type--</option>
            { this.state.activityTypes.length > 0 ? this.activityTypeOptions() : "" }
          </select>

          <input type="text"
            onChange={this.changeTitle}
            value={this.state.title} />

          <input type="time"
            onChange={this.changeDuration}
            value={this.state.duration} />

          <textarea
            onChange={this.changeDescription}
            value={this.state.description} />

          <input type="file"
            onChange={this.changeFile} />

          <button type="submit">Add Activity</button>

        </form>
      </div>
    );
  }

});


module.exports = ActivityForm;
