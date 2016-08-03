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
      <ul className="right-nav-list">
        <li>
          <a onClick={ this.goToSignup } >Sign Up</a>
        </li>
      </ul>
    );
  },

  render() {

    let rightNav = this.selectNav();

    return (
      <div>
        <h1 className="header-logo"><a href="#">trakr</a></h1>
        { rightNav }
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
      <ul className="right-nav-list">
        <li>
          <a onClick={ this.goToLogin } >Log In</a>
        </li>
      </ul>
    );
  },

  userNav() {
    return (
      <ul className="right-nav-list">
        <li>
          <a>{ SessionStore.currentUser().email }</a>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    );
  }

});

module.exports = NavBar;
