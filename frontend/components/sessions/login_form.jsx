// react requires
const hashHistory     = require('react-router').hashHistory;
const React           = require('react');

// project requires
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
        <div className="form-row">
          <input
            type="text"
            value={ this.state.first_name }
            onChange={ this.changeFirstName }
            placeholder="First Name"/>
          <input
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

  // remove listeners
  componentWillUnmount() {
    this.sessionListener.remove();
  },

  // standardFields() {
  //
  //   return (
  //
  //     <div className="form-row">
  //       <input
  //         type="email"
  //         value={ this.state.email }
  //         onChange={ this.changeEmail }
  //         placeholder="Email"/>
  //     </div>
  //
  //     <div className="form-row">
  //       <input id="login-password"
  //         type="password"
  //         value={ this.state.password }
  //         onChange={ this.changePassword }
  //         placeholder="Password" />
  //     </div>
  //   );
  // }

  getInitialState() {
    return { email: "", password: "",
             first_name: "", last_name: "",
             errors: [] };
  },

  // login with provided credentials
  handleSubmit() {
    const email = this.state.email;
    const password = this.state.password;
    if (this.props.location.pathname === "/signup") {
      let user = {
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.first_name,
        last_name: this.state.last_name
      }
      SessionActions.signup(user);
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

    return (
      <div className="session-form">
        <form onSubmit={ this.handleSubmit } >

          <FormErrors errors={ this.state.errors } />

          { this.additionalSignupFields() }

          <div className="form-row">
            <input
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
            <button type="submit" >{ this.buttonText() }</button>
          </div>

        </form>
      </div>
    );
  },

});

module.exports = LoginForm;
