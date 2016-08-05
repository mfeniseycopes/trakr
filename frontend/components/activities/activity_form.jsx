// react requires
const hashHistory     = require('react-router').hashHistory;
const React           = require('react');

// project requires
const ErrorStore      = require('../../stores/error_store');
const FormErrors      = require('../errors/form_errors');
const UserActions  = require('../../actions/user_actions');
const UserStore    = require('../../stores/user_store');

const ProfileEditForm = React.createClass({

  addErrors() {
    this.setState({ errors: ErrorStore.errors("activityForm") });
  },

  changeFile(e) {
    this.setState({ first_name: e.target.value });
  },

  componentDidMount() {
    ErrorStore.addListener(this.addErrors);
  },

  getInitialState() {
    return {
      gpxFile: "",

      errors: []
     };
  },

  render() {
    return (
      <form onSubmit={ this.updateUser }>
        <input type="file" />
        <button className="button form-button" type="submit" value="Update">Update</button>
      </form>
    );
  },

  updateUser() {
    let activity = {
      gpx
    };

    ActivityActions.createActivity(activity);
  }

});


module.exports = ProfileEditForm;
