// react requires
const hashHistory     = require('react-router').hashHistory;
const React           = require('react');

// project requires
// actions
const UserActions     = require('../../actions/user_actions');
// components
const ActivitiesTable = require('../activities/activities_table');
const Error404 = require('../error_404');
const FollowButton = require('../follows/follow_button');
const FormErrors      = require('../errors/form_errors');
const ProfileDetail   = require('./profile_detail');
const ProfileEditForm = require('./profile_edit_form');
const Progress        = require('./progress.jsx');
// stores
const ErrorStore      = require('../../stores/error_store');
const SessionStore    = require('../../stores/session_store');
const UserStore       = require('../../stores/user_store');

const Profile = React.createClass({

  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.handle404);
    this.userListener = UserStore.addListener(this.resetUser);
    this.requestUser(this.props.params.id);
  },

  componentWillReceiveProps(newProps) {
    if (newProps.params.id !== this.props.params.id) {
      this.requestUser(newProps.params.id);
    }
  },

  componentWillUnmount() {
    this.deregisterListeners();
  },

  deregisterListeners() {
    this.errorListener.remove();
    this.userListener.remove();
  },

  getInitialState() {
    if ((this.onProfile() &&
            SessionStore.currentUser().id === UserStore.user().id) ||
         this.props.params.id === UserStore.user().id) {

      return { user: UserStore.user() };
    }
    else {
      return null;
    }
  },

  onProfile() {
    return this.props.location.pathname === "/profile" || this.props.location.pathname === "/";
  },

  render() {

    if (this.state === null) {
      return <div></div>;
    }

    else if (this.state.error) {
      return <Error404 />;
    }

    else {
      let inner = <ProfileDetail user={ this.state.user } />;
      if (this.state.edit) {
        inner = <ProfileEditForm user={ this.state.user } />;
      }

      return (
        <div className="user group">
          <div>
            <section className="user-pane group">
              <div className="page-top">
                <h2 className="page-header">Profile</h2>
                { this.toggleButton() }
              </div>
              { inner }
            </section>
            <Progress />
          </div>
          <ActivitiesTable />
        </div>
      );
    }
  },

  handle404() {
    let error = ErrorStore.errors("user");
    if (error) {
      this.setState({ error: true });
    }
  },

  requestUser(id) {
    if (this.onProfile()) {
      UserActions.getUser(SessionStore.currentUser().id);
    } else {
      UserActions.getUser(id);
    }
  },

  resetUser() {
    this.setState({ user: UserStore.user(), edit: false });
  },

  updateUser() {
    UserActions.updateUser(this.state.user);
  },

  toggleButton() {
    if (this.onProfile()) {
      if (!this.state.edit) {
        return <a onClick={ this.toggleModes } className="button form-button bottom" >Edit</a>;
      }
      else {
        return <a onClick={ this.toggleModes } className="button form-button bottom" >Cancel</a>;
      }
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
