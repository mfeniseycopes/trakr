// react requires
const hashHistory     = require('react-router').hashHistory;
const React           = require('react');

// project requires
const ErrorStore      = require('../../stores/error_store');
const FormErrors      = require('../errors/form_errors');
const ProfileDetail = require('./profile_detail');
const ProfileEditForm = require('./profile_edit_form');
const UserActions  = require('../../actions/user_actions');
const SessionStore = require('../../stores/session_store');
const UserStore    = require('../../stores/user_store');

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

  editButton() {
    if (this.props.location.pathname === "/profile" && !this.state.edit) {
      return <a onClick={ this.switchToEdit } className="button" >Edit</a>;
    }
    else {
      return "";
    }
  },

  getInitialState() {
    if ((this.props.location.pathname === "/profile"
           && SessionStore.currentUser().id === UserStore.user().id)
         || this.props.params === UserStore.user().id) {

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
      <div>
        <h2 className="page-header">Profile</h2>
        { this.editButton() }
        { inner }
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

  switchToEdit() {
    this.setState({ edit: true });
  },

  viewRender() {
    return (

      <div className="user form group">
        <div className="user-avatar-large">
          <img src={this.state.user.avatar_url} />
        </div>
        <div className="user-detail">
          <h3>{this.state.user.first_name} {this.state.user.last_name}</h3>
          <p>Member since {this.state.user.user_since}</p>
          <p>{this.state.user.location}</p>
          <p>{this.state.user.bio}</p>
        </div>
      </div>
    );
  },

});

module.exports = Profile;
