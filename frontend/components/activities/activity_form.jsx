// react requires
const hashHistory         = require('react-router').hashHistory;
const React               = require('react');

// project requires
const ActivityActions     = require('../../actions/activity_actions');
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
    ActivityTypeStore.addListener(this.addActivityTypes);

    ActivityTypeActions.getActivityTypes();
  },

  getInitialState() {
    return {
      activity: {
        activityType: null,
        description: "",
        gpxFile: null,
        title: ""
      },

      activityTypes: [],

      errors: []
     };
  },

  getRes() {

  },

  handleSubmit() {
    debugger

    var formData = new FormData();
    formData.append("activity[gpx]", this.state.gpxFile);
    formData.append("activity[activity_type_id]", this.state.activityType);
    formData.append("activity[title]", this.state.title);
    formData.append("activity[description]", this.state.description);
    ActivityActions.createActivity(formData);
  },

  render() {

    return(
      <div>
        <h2>GPX Form!</h2>

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

        <button onClick={this.handleSubmit}>Add Activity</button>
      </div>);

  }

});


module.exports = ActivityForm;
