// react requires
const React           = require('react');

// project requires
const ActivityActions = require('../actions/activity_actions');
const ActivityStore   = require('../stores/activity_store');
const ActivityTable   = require('../components/activities/activity_table');
const ErrorStore      = require('../stores/error_store');
const SessionStore    = require('../stores/session_store');


const Training = React.createClass({

  // when first mounts we need to get user based on current info
  componentDidMount() {
    this.activityListener = ActivityStore.addListener(this.updateActivities);
    this.errorListener = ErrorStore.addListener(this.handleErrors);

    ActivityActions.getActivitiesByUser(SessionStore.currentUser().id);
  },

  componentWillUnmount() {
    this.deregisterListeners();
  },

  deregisterListeners() {
    this.activityListener.remove();
    this.errorListener.remove();
  },

  getInitialState() {
    return { activities: null };
  },

  handleErrors() {
    if (ErrorStore.errors("activities").length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
    }
  },

  render() {
    if (this.state.error) {
      return <Error404 />;
    }
    else if (!this.state.activities) {
      return null;
    }
    else {
      return (
        <div>
          <div className="page-header group">
            <h1>Training</h1>
          </div>
          <div className="group">
            <div className="three-thirds">
              <ActivityTable activities={this.state.activities} />
              {
                this.state.activities.length === 0 ?
                <p className="activities-table-empty">No activities... yet! Do an activity to see your progress.</p> : ""
              }
            </div>
          </div>
        </div>
      );
    }
  },

  updateActivities() {
    this.setState({ activities: ActivityStore.all() });
  }

});

module.exports = Training;
