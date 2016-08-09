// react requires
const hashHistory         = require('react-router').hashHistory;
const React               = require('react');

// project requires
const ActivityActions     = require('../../actions/activity_actions');
const ActivityCreationMap = require('./activity_creation_map');
const ActivityDetail      = require('./activity_detail');
const ActivityForm        = require('./activity_form');
const ActivityStore       = require('../../stores/activity_store');
const ActivityTypeActions = require('../../actions/activity_type_actions');
const ActivityTypeStore   = require('../../stores/activity_type_store');
const Error404            = require('../error_404');
const ErrorStore          = require('../../stores/error_store');
const FormErrors          = require('../errors/form_errors');
const SessionStore        = require('../../stores/session_store');

const Activity = React.createClass({

  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.handleErrors);
    this.activityListener = ActivityStore.addListener(this.resetActivity);
    ActivityActions.getActivity(this.props.params.id);
  },

  componentWillReceiveProps(newProps) {
    if (newProps.params.id !== this.props.params.id) {
      ActivityActions.getActivity(id);
    }
    ErrorActions.clearErrors();
  },

  componentWillUnmount() {
    this.deregisterListeners();
  },

  deregisterListeners() {
    this.errorListener.remove();
    this.activityListener.remove();
  },

  getInitialState() {
    return { activity: null };
  },

  handleErrors() {
    if (ErrorStore.errors("activity").length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
    }
  },

  render() {

    if (this.state.error) {
      return <Error404 />;
    }
    else if (!this.state.activity) {
      return <div></div>;
    }
    else {
      return (
        <div className="user group">
          <div>
            <section className="user-pane group">
              <div className="page-top">
                <h2 className="page-header">Activity</h2>
                { this.toggleButton() }
              </div>
              { this.state.editable ? <p>Editable</p> : <p>Not Editable</p> }
              {
                this.state.edit ?
                  <ActivityForm activity={this.state.activity} /> :
                  <ActivityDetail activity={this.state.activity} />
              }
            </section>
          </div>
        </div>

      );
    }
  },

  resetActivity() {
    let activity = ActivityStore.find(this.props.params.id);
    this.setState({
      activity: activity,
      edit: false,
      editable: activity.user.id === SessionStore.currentUser().id
    });
  },

  toggleButton() {
    if (this.state.editable) {
      return (
        <a onClick={ this.toggleModes } className="button form-button bottom" >
          { this.state.edit ? "Cancel" : "Edit" }
        </a>
      );
    }
    else {
      return "";
    }
  },

  toggleModes() {
    this.setState({ edit: !this.state.edit });
  }

});

let _emptyActivity = {
  user_name: "",
  activity_type_name: "",
  title: "",
  description: "",
  date: "",
  distance: 0,
  duration: 0,
  speed: 0
};

module.exports = Activity;
