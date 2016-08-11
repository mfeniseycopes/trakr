// react
const React = require('react');

// project requires
const ErrorActions    = require('../actions/error_actions');
const LogoutButton    = require('./sessions/logout_button');
const NavBar = require('./navbar');
const SessionStore    = require('../stores/session_store');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


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

    var path = this.props.location.pathname;
    var segment = path.split('/')[1] || 'root';

    return (
      <div>
        <NavBar location={ this.props.location.pathname } />

        <main className="content group">
          {this.props.children}
        </main>
      </div>
    );
  }

});

module.exports = App;
