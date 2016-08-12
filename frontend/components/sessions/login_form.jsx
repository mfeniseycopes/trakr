// react requires
const hashHistory     = require('react-router').hashHistory;
const React           = require('react');

// project requires
const ErrorActions    = require('../../actions/error_actions');
const ErrorStore      = require('../../stores/error_store');
const FormErrors      = require('../errors/form_errors');
const SessionActions  = require('../../actions/session_actions');
const SessionStore    = require('../../stores/session_store');

const LoginForm = React.createClass({

  // adds errors to form
  addErrors() {
    let form =
      (this.props.location.pathname === "/signup" ? "signup" : "login");
    this.setState({ errors: ErrorStore.errors(form) });
  },

  additionalSignupFields() {

    if (this.props.location.pathname === "/signup") {

      return (
        <div className="session-form-row group">
          <input
            className="session-form-row-half"
            type="text"
            value={ this.state.first_name }
            onChange={ this.changeFirstName }
            placeholder="First Name"/>
          <input
            className="session-form-row-half"
            type="text"
            value={ this.state.last_name }
            onChange={ this.changeLastName }
            placeholder="Last Name"/>
        </div>
      );
    }
    else {
      return "";
    }
  },

  // get appropriate button text
  buttonText() {
    let buttonText = "Login";

    if (this.props.location.pathname === "/signup") {
      buttonText = "Sign Up";
    }

    return buttonText;
  },

  // input change methods
  changeEmail(e) {
    this.setState({ email: e.target.value });
  },

  // input change methods
  changeFirstName(e) {
    this.setState({ first_name: e.target.value });
  },

  changeLastName(e) {
    this.setState({ last_name: e.target.value });
  },

  changePassword(e) {
    this.setState({ password: e.target.value });
  },

  // add listeners
  componentDidMount() {
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
    this.errorListener = ErrorStore.addListener(this.addErrors);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      ErrorActions.clearErrors();
    }
  },

  componentWillUnmount() {
    this.deregisterListeners();
  },

  deregisterListeners() {
    this.sessionListener.remove();
    this.errorListener.remove();
  },

  getInitialState() {
    return {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      errors: [] };
  },

  // login with provided credentials
  handleSubmit(e) {

    e.preventDefault();

    const email = this.state.email;
    const password = this.state.password;
    if (this.props.location.pathname === "/signup") {
      let user = {
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.first_name,
        last_name: this.state.last_name
      };

      SessionActions.signup(user);
    } else {
      SessionActions.login(email, password);
    }
  },

  // go to home page if logged in
  redirectIfLoggedIn() {
    if (SessionStore.isLoggedIn()) {
      hashHistory.push("/profile");
    }
  },

  render() {

    return (
      <div className="session-form">
        <form onSubmit={ this.handleSubmit } >

          <FormErrors errors={ this.state.errors } />

          { this.additionalSignupFields() }

          <div className="session-form-row">
            <input
              className="session-form-row-full"
              type="email"
              value={ this.state.email }
              onChange={ this.changeEmail }
              placeholder="Email"/>
          </div>

          <div className="session-form-row">
            <input
              className="session-form-row-full"
              type="password"
              value={ this.state.password }
              onChange={ this.changePassword }
              placeholder="Password" />
          </div>

          <div className="session-form-row">
            <button className="session-form-row-full" type="submit" >{ this.buttonText() }</button>
            {
              this.props.location.pathname === "/signup" ?
              <button className="session-form-row-full guest-login-button" onClick={ this.guestLogin } >
                Guest Login
              </button> : ""
            }
          </div>

        </form>
      </div>
    );
  },

  guestLogin() {
    SessionActions.login("guest@email.com", "starwars");
  }

});

module.exports = LoginForm;
