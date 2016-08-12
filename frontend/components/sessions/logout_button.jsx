const React           = require('react');
const hashHistory = require('react-router').hashHistory;

// project requires
const SessionActions  = require('../../actions/session_actions');
const SessionStore    = require('../../stores/session_store');

const LogoutButton = React.createClass({

  logout() {
    SessionActions.logout();
    // hashHistory.push("/signup");
  },

  render() {
    return (
      <a onClick={this.logout}>Log Out</a>
    );
  }

});

module.exports = LogoutButton;
