// react
const React = require('react');

// project requires
const LogoutButton    = require('./sessions/logout_button');
const NavBar = require('./navbar');
const SessionStore    = require('../stores/session_store');

const App = React.createClass({

  componentDidMount() {
    // prevents redundant storing of logged in state in this.state
    this.sessionListener = SessionStore.addListener(this.forceUpdate.bind(this));
  },

  componentWillUnmount() {
    this.deregisterListeners();
  },

  deregisterListeners() {
    this.sessionListener.remove();
  },

  render() {
    return (
      <div>
        <header className="header">
          <nav className="header-nav group">
            <NavBar location={ this.props.location.pathname } />
          </nav>
        </header>
        <main className="content">
          { this.props.children }
        </main>
      </div>
    );
  }

});

module.exports = App;
