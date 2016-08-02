const React           = require('react');

// project requires
const SessionActions  = require('../../actions/session_actions');
const SessionStore    = require('../../stores/session_store');

const LogoutButton = React.createClass({

  render() {
    return (
      <div>
        <button onClick={SessionActions.logout}>Log Out</button>
      </div>
    );
  }

});

module.exports = LogoutButton;
