// react requires
const hashHistory     = require('react-router').hashHistory;
const React           = require('react');

// project requires
const ActivityApiUtil = require('../../utils/activity_api_util');
const ErrorStore      = require('../../stores/error_store');
const FormErrors      = require('../errors/form_errors');

const ActivityForm = React.createClass({

  addErrors() {
    this.setState({ errors: ErrorStore.errors("activityForm") });
  },

  changeActivityType(e) {
    debugger
    this.setState({ activityType: e.target.value });
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

  componentDidMount() {
    ErrorStore.addListener(this.addErrors);
  },

  getInitialState() {
    return {
      gpxFile: null,

      errors: []
     };
  },

  getRes() {

  },

  handleSubmit() {
    var formData = new FormData();
    formData.append("activity[gpx]", this.state.gpxFile);
    formData.append("activity[activity_type]", this.state.activityType);
    ActivityApiUtil.createActivity(formData, this.getRes);
  },

  render() {

    return(
      <div>
        <h2>GPX Form!</h2>
        <select name="Type">
          <option value="1">Run</option>
          <option value="2">Ride</option>
        </select>
        <input type="file" onChange={this.changeFile}/>
        <button onClick={this.handleSubmit}>Add Activity</button>
      </div>);

  },

  updateUser() {
    let activity = {
      gpx
    };

    ActivityActions.createActivity(activity);
  }

});


module.exports = ActivityForm;
