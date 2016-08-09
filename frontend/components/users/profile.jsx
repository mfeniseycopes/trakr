// react requires
const hashHistory     = require('react-router').hashHistory;
const React           = require('react');

// project requires
// actions
const ActivityActions = require('../../actions/activity_actions');
const ErrorActions    = require('../../actions/error_actions');
const UserActions     = require('../../actions/user_actions');
// components
const ActivitiesTable = require('../activities/activities_table');
const Error404        = require('../error_404');
const FollowButton    = require('../follows/follow_button');
const FormErrors      = require('../errors/form_errors');
const ProfileDetail   = require('./profile_detail');
const ProfileEditForm = require('./profile_edit_form');
const Progress        = require('./progress.jsx');
// stores
const ActivityStore   = require('../../stores/activity_store');
const ErrorStore      = require('../../stores/error_store');
const SessionStore    = require('../../stores/session_store');
const UserStore       = require('../../stores/user_store');

const Profile = React.createClass({

  // when first mounts we need to get user based on current info
  componentDidMount() {
    this.activityListener = ActivityStore.addListener(this.updateActivities);
    this.errorListener = ErrorStore.addListener(this.handleErrors);
    this.userListener = UserStore.addListener(this.resetUser);

    if (this.props.location.pathname === "/profile") {
      UserActions.getUser(SessionStore.currentUser().id);
    } else {
      UserActions.getUser(this.props.params.id);
    }

    //ActivityActions.get
  },

  // when props change we need to get user based on future info
  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      if (newProps.location.pathname === "/profile") {
        UserActions.getUser(SessionStore.currentUser().id);
      } else {
        UserActions.getUser(newProps.params.id);
      }
    }
    ErrorActions.clearErrors();
  },

  componentWillUnmount() {
    this.deregisterListeners();
  },

  deregisterListeners() {
    this.activityListener.remove();
    this.errorListener.remove();
    this.userListener.remove();
  },

  getInitialState() {
    return { user: null };
  },

  handleErrors() {
    if (ErrorStore.errors("user").length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
    }
  },

  render() {

    if (this.state.error) {
      return <Error404 />;
    }
    else if (!this.state.user) {
      return <div></div>;
    }
    else {

      return (
        <div className="user group">
          <div>
            <section className="user-pane group">
              <div className="page-top">
                <h2 className="page-header">Profile</h2>
                { this.toggleButton() }
              </div>
              {
                this.state.edit ?
                  <ProfileEditForm user={ this.state.user } /> :
                  <ProfileDetail user={ this.state.user } />
              }
            </section>
            <Progress />
          </div>
          <ActivitiesTable />
        </div>
      );
    }
  },

  resetUser() {
    let user = UserStore.user();
    this.setState({
      user: user,
      edit: false,
      editable: user.id === SessionStore.currentUser().id
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
      return <FollowButton />;
    }
  },

  toggleModes() {
    this.setState({ edit: !this.state.edit });
  }

});

module.exports = Profile;
