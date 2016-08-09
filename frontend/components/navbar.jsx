// react
const React = require('react');
const hashHistory = require('react-router').hashHistory;
const Link = require('react-router').Link;

// project requires
const LogoutButton    = require('./sessions/logout_button');
const SessionStore    = require('../stores/session_store');

const NavBar = React.createClass({

  componentDidMount() {
    // prevents redundant storing of logged in state in this.state
    this.sessionListener = SessionStore.addListener(this.forceUpdate.bind(this));
  },

  componentWillUnmount() {
    this.deregisterListeners();
  },

  deregisterListeners() {
    this.sesssionListener.remove();
  },

  loginNav() {
    return (
      <ul className="right-nav-list">
        <li>
          <Link to={"/signup"} >Sign Up</Link>
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
          <Link to={"/login"} >Log In</Link>
        </li>
      </ul>
    );
  },

  userNav() {
    return (
      <ul className="right-nav-list">
        <li>
          <Link to={"/profile"} className="user-avatar-outside-padding" >
            <div className="user-avatar small">
              <img
                src={ SessionStore.currentUser().avatar_url } />
            </div>
          </Link>
        </li>
        <li>
          <Link to={"/create-activity"} title="New Activity">[+]</Link>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    );
  }

});

module.exports = NavBar;
