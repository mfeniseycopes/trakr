// react requires
const hashHistory     = require('react-router').hashHistory;
const React           = require('react');

// project requires
const ErrorStore      = require('../../stores/error_store');
const FormErrors      = require('../errors/form_errors');
const UserActions  = require('../../actions/user_actions');
const UserStore    = require('../../stores/user_store');

const Profile = React.createClass({

  componentDidMount() {
    this.userListener = UserStore.addListener(this.updateUser);
    debugger
    UserActions.getUser(this.props.params.id);
  },

  getInitialState() {
    return { user: UserStore.user() };
  },

  render() {
    return (
      <div>
        <h3>Profile</h3>
        <p>{this.state.user.first_name}</p>
        <p>{this.state.user.last_name}</p>
        <p>{this.state.user.location}</p>
        <img src={this.state.user.avatar_url} />
      </div>
    );
  },

  updateUser() {
    this.setState({ user: UserStore.user() });
  }

});

module.exports = Profile;
