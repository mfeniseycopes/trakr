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
  handleSubmit() {
    const email = this.state.email;
    const password = this.state.password;
    if (this.props.location.pathname === "/signup") {
      SessionActions.signup(email, password);
    } else {
      SessionActions.login(email, password);
    }
  },

  // go to home page if logged in
  redirectIfLoggedIn() {
    if (SessionStore.isLoggedIn()) {
      hashHistory.push("/");
    }
  },

  render() {

    let buttonText = "Login";
    if (this.props.location.pathname === "/signup") {
      buttonText = "Sign Up";
    }

    return (
      <div className="session-form">
        <form onSubmit={ this.handleSubmit } >

          <div className="form-row">
          <input id="login-email"
            type="email"
            value={ this.state.email }
            onChange={ this.changeEmail }
            placeholder="Email"/>
        </div>
          <div className="form-row">

          <input id="login-password"
            type="password"
            value={ this.state.password }
            onChange={ this.changePassword }
            placeholder="Password" />
        </div>

        <div className="form-row">
          <button type="submit" >{ buttonText }</button>
          </div>
        </form>
      </div>
    );
  },

});

module.exports = LoginForm;
