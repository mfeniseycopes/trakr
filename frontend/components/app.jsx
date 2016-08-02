// react
const React = require('react');

// project requires
const LogoutButton    = require('./sessions/logout_button');
const SessionStore    = require('../stores/session_store');

const App = React.createClass({

  componentDidMount() {
    // prevents redundant storing of logged in state in this.state
    SessionStore.addListener(this.forceUpdate.bind(this));
  },

  render() {
    return (
      <div>
        <h1>App</h1>
        { SessionStore.isLoggedIn() ? this.userNav() : "" }
        { this.props.children }
      </div>
    );
  },

  userNav() {
    return (
      <div>
        <h2>user_nav</h2>
        <h3>{ SessionStore.currentUser().email }</h3>
        <LogoutButton />
      </div>
    );
  }

});

module.exports = App;
