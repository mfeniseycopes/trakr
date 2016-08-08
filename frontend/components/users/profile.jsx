// react requires
const hashHistory     = require('react-router').hashHistory;
const React           = require('react');

// project requires
// actions
const UserActions     = require('../../actions/user_actions');
// components
const ActivitiesTable = require('../activities/activities_table');
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
    this.userListener = UserStore.addListener(this.resetUser);
    this.requestUser(this.props);
  },

  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      this.requestUser(newProps);
    }
  },

  componentWillUnmount() {
    this.deregisterListeners();
  },

  deregisterListeners() {
    this.userListener.remove();
  },

  getInitialState() {
    if ((this.props.location.pathname === "/profile" &&
            SessionStore.currentUser().id === UserStore.user().id) ||
         this.props.params === UserStore.user().id) {

      return { user: UserStore.user() };
    }
    else {
      return {
        user: {
          id: "",
          first_name: "",
          last_name: "",
          location: "",
          bio: ""
        },
        edit: false
      };
    }
  },

  render() {
    let inner = <ProfileDetail user={ this.state.user } />;
    if (this.state.edit) {
      inner = <ProfileEditForm user={ this.state.user } />
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
  },

  requestUser(props) {
    if (props.location.pathname === "/profile") {
      UserActions.getUser(SessionStore.currentUser().id);
    } else {
      UserActions.getUser(props.params.id);
    }
  },

  resetUser() {
    this.setState({ user: UserStore.user(), edit: false });
  },

  updateUser() {
    UserActions.updateUser(this.state.user);
  },

  toggleButton() {
    if (this.props.location.pathname === "/profile") {
      if (!this.state.edit) {
        return <a onClick={ this.toggleModes } className="button form-button bottom" >Edit</a>;
      }
      else {
        return <a onClick={ this.toggleModes } className="button form-button bottom" >Cancel</a>;
      }
    }
    else {
      return <FollowButton />
    }
  },

  toggleModes() {
    this.setState({ edit: !this.state.edit });
  }

});

module.exports = Profile;
