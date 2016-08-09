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
    this.activityListener = ActivityStore.addListener(this.resetActivity);
    ActivityActions.getActivity(this.props.params.id);
  },

  componentWillUnmount() {
    this.activityListener.remove();
  },

  getInitialState() {
    return { activity: null };
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
