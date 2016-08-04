// react requires
const hashHistory     = require('react-router').hashHistory;
const React           = require('react');

// project requires
const ErrorStore      = require('../../stores/error_store');
const FormErrors      = require('../errors/form_errors');
const UserActions  = require('../../actions/user_actions');
const SessionStore = require('../../stores/session_store');
const UserStore    = require('../../stores/user_store');

const Profile = React.createClass({

  componentDidMount() {
    this.userListener = UserStore.addListener(this.updateUser);
    this.requestUser(this.props);
  },

  componentWillReceiveProps(newProps) {
    this.requestUser(newProps);
  },

  editButton() {
    if (this.props.location.pathname === "/profile") {
      return <a className="button" href="#">Edit</a>;
    } else {
      return "";
    }
  },

  getInitialState() {
    return { user: UserStore.user() };
  },

  render() {
    return (
      <div>
      <h2 className="page-header">Profile</h2>
      { this.editButton() }
      <div className="user group">
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

  updateUser() {
    this.setState({ user: UserStore.user() });
  }

});

module.exports = Profile;
