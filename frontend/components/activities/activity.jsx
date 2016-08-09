// react requires
const hashHistory         = require('react-router').hashHistory;
const React               = require('react');

// project requires
const ActivityActions     = require('../../actions/activity_actions');
const ActivityCreationMap = require('./activity_creation_map');
const ActivityDetail      = require('./activity_detail');
const ActivityStore       = require('../../stores/activity_store');
const ActivityTypeActions = require('../../actions/activity_type_actions');
const ActivityTypeStore   = require('../../stores/activity_type_store');
const ErrorStore          = require('../../stores/error_store');
const FormErrors          = require('../errors/form_errors');

const Activity = React.createClass({

  activityDetail() {
    return <ActivityDetail activity={this.state.activity} />;
  },

  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.handle404);
    this.activityListener = ActivityStore.addListener(this.resetActivity);
    ActivityActions.getActivity(this.props.params.id);
  },

  componentWillReceiveProps(newProps) {
    if (newProps.params.id !== this.props.params.id) {
      ActivityActions.getActivity(id);
    }
  },

  componentWillUnmount() {
    this.deregisterListeners();
  },

  deregisterListeners() {
    this.errorListener.remove();
    this.activityListener.remove();
  },

  getInitialState() {
    return null;
  },

  handle404() {
    let error = ErrorStore.errors("user");
    if (error) {
      this.setState({ error: true });
    }
  },

  render() {
    return (
      <div>
        <h1>Activity</h1>
        {
          this.state.activity ? this.activityDetail() : ""
        }
      </div>
    );
  },

  resetActivity() {
    this.setState({ activity: ActivityStore.find(this.props.params.id) });
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
