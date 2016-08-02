const React           = require('react');
const hashHistory = require('react-router').hashHistory;

// project requires
const SessionActions  = require('../../actions/session_actions');
const SessionStore    = require('../../stores/session_store');

const LogoutButton = React.createClass({

  logout() {
    debugger
    SessionActions.logout();
    hashHistory.push("/signup");
  },

  render() {
    return (
      <div>
        <button onClick={this.logout}>Log Out</button>
      </div>
    );
  }

});

module.exports = LogoutButton;
