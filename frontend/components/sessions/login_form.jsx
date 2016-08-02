// react requires
const hashHistory     = require('react-router').hashHistory;
const React           = require('react');

// project requires
const SessionActions  = require('../../actions/session_actions');
const SessionStore    = require('../../stores/session_store');

const LoginForm = React.createClass({

  // input change methods
  changeEmail(e) {
    this.setState({ email: e.target.value });
  },

  changePassword(e) {
    this.setState({ password: e.target.value });
  },

  // add listeners
  componentDidMount() {
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },

  // remove listeners
  componentWillUnmount() {
    this.sessionListener.remove();
  },

  getInitialState() {
    return { email: "", password: "" };
  },

  // login with provided credentials
  login() {
    const email = this.state.email;
    const password = this.state.password;
    SessionActions.login(email, password);
  },

  // go to home page if logged in
  redirectIfLoggedIn() {
    if (SessionStore.isLoggedIn()) {
      hashHistory.push("/");
    }
  },

  render() {
    return (
      <div>
        <h2>LoginForm</h2>
        <form onSubmit={ this.login } >

          <label>Email
            <input id="login-email"
              type="email"
              value={ this.state.email }
              onChange={ this.changeEmail } />
          </label>

          <label>Password
            <input id="login-password"
              type="password"
              value={ this.state.password }
              onChange={ this.changePassword } />
          </label>

          <button type="submit" >Log In</button>

        </form>
      </div>
    );
  }

});

module.exports = LoginForm;
