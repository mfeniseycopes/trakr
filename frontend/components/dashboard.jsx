// react requires
const hashHistory     = require('react-router').hashHistory;
const React           = require('react');

// project requires
// actions
const ErrorActions    = require('../actions/error_actions');
const UserActions     = require('../actions/user_actions');
// components
const ActivityList    = require('./activities/activity_list');
const Error404        = require('./error_404');
const FollowButton    = require('./follows/follow_button');
const FormErrors      = require('./errors/form_errors');
const ProfileDetail   = require('./users/profile_detail');
const ProfileEditForm = require('./users/profile_edit_form');
const Progress        = require('./users/progress.jsx');
// stores
const ActivityStore   = require('../stores/activity_store');
const ErrorStore      = require('../stores/error_store');
const SessionStore    = require('../stores/session_store');
const UserStore       = require('../stores/user_store');

const Dashboard = React.createClass({

  componentDidMount() {

    this.errorListener = ErrorStore.addListener(this.handleErrors);
    this.userListener = UserStore.addListener(this.resetDashboard);

    // fetch page info
    UserActions.getDashboard();
  },

  componentWillUnmount() {
    this.deregisterListeners();
  },

  deregisterListeners() {
    this.errorListener.remove();
    this.userListener.remove();
  },

  getInitialState() {
    return { dashboard: null };
  },

  render() {
    if (!this.state.dashboard) {
      return (
        <div>
          <div className="page-header group">
            <h1>Dashboard</h1>
          </div>
        </div>
      );
    }
    else {
      return (
        <div>
          <div className="page-header group">
            <h1>Dashboard</h1>
          </div>
          <div className="group">
            {
              (this.state.dashboard.followee_activities.length > 0) ?
                (<ActivityList width="two-thirds-left"
                  activities={this.state.dashboard.followee_activities} />) :
                (<p>No activities... yet! Follow more users and do an activity to see more.</p>)
            }
            <Progress weekStats={this.state.dashboard.week_stats}/>
          </div>
        </div>
      );
    }
  },

  resetDashboard() {
    this.setState({ dashboard: UserStore.user(SessionStore.currentUser().id) });
  }

});

module.exports = Dashboard;
