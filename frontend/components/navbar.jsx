// react
const React = require('react');
const hashHistory = require('react-router').hashHistory;

// project requires
const LogoutButton    = require('./sessions/logout_button');
const SessionStore    = require('../stores/session_store');

const NavBar = React.createClass({

  componentDidMount() {
    // prevents redundant storing of logged in state in this.state
    SessionStore.addListener(this.forceUpdate.bind(this));
  },

  goToLogin() {
    hashHistory.push("/login");
  },

  goToSignup() {
    hashHistory.push("/signup");
  },

  loginNav() {
    return (
      <div>
        <button onClick={ this.goToSignup } >Sign Up</button>
      </div>
    );
  },

  render() {

    let nav = this.selectNav();

    return (
      <div>
        <h2>NavBar</h2>
        { nav }
      </div>
    );
  },

  selectNav() {

    if (this.props.location === "/login") {
      return this.loginNav();
    }
    else if (this.props.location === "/signup") {
      return this.signupNav();
    }
    else {
      return this.userNav();
    }
  },

  signupNav() {
    return (
      <div>
        <button onClick={ this.goToLogin } >Log In</button>
      </div>
    );
  },

  userNav() {
    return (
      <div>
        <h3>{ SessionStore.currentUser().email }</h3>
        <LogoutButton />
      </div>
    );
  }

});

module.exports = NavBar;
