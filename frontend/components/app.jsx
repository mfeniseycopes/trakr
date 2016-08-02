// react
const React = require('react');

// project requires
const LogoutButton    = require('./sessions/logout_button');
const NavBar = require('./navbar');
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
        <NavBar location={ this.props.location.pathname } />
        { this.props.children }
      </div>
    );
  }

});

module.exports = App;
