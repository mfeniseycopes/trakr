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
    ErrorStore.addListener(this.addErrors);

    // populate activityType dropdown
    ActivityTypeStore.addListener(this.addActivityTypes);
    ActivityTypeActions.getActivityTypes();

    // get route info from prepopulated activity
  },

  getInitialState() {
    let activity;
    if (this.props.location.query.from === "creator" ||
        this.props.location.query.from === "upload") {
      activity = ActivityStore.newActivity();
    }
    else {
      activity = {
        activityType: null,
        description: "",
        gpxFile: null,
        title: ""
      };
    }

    return {
      activity: activity,
      activityTypes: [],
      errors: []
    };
  },

  handleSubmit() {

    var formData = new FormData();
    formData.append("activity[gpx]", this.state.gpxFile);
    formData.append("activity[activity_type_id]", this.state.activityType);
    formData.append("activity[title]", this.state.title);
    formData.append("activity[description]", this.state.description);
    ActivityActions.createActivity(formData);
  },

  miniMapUrl() {
    return `https://maps.googleapis.com/maps/api/staticmap?size=300x200&path=color:0x003A23%7Cenc:${this.state.activity.encPolyline}`;
  },

  render() {

    return(
      <div>
        <p>{ this.state.activity.distance.text }</p>

        <img className="mini-map" src={ this.miniMapUrl() } />

        <form onSubmit={this.handleSubmit}>

          <select name="Type" onChange={this.changeActivityType}>
            <option value="" >--Type--</option>
            { this.state.activityTypes.length > 0 ? this.activityTypeOptions() : "" }
          </select>

          <input type="text"
            onChange={this.changeTitle}
            value={this.state.title} />

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
