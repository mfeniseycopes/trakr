// react requires
const hashHistory     = require('react-router').hashHistory;
const React           = require('react');

// project requires
const ErrorStore      = require('../../stores/error_store');
const FormErrors      = require('../errors/form_errors');
const UserActions  = require('../../actions/user_actions');
const UserStore    = require('../../stores/user_store');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const ProfileEditForm = React.createClass({

  addErrors() {
    this.setState({ errors: ErrorStore.errors("userForm") });
  },

  changeFirstName(e) {
    this.setState({ first_name: e.target.value });
  },

  changeLastName(e) {
    this.setState({ last_name: e.target.value });
  },

  changeLocation(e) {
    this.setState({ location: e.target.value });
  },

  changeBio(e) {
    this.setState({ bio: e.target.value });
  },

  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.addErrors);
  },

  componentWillUnmount() {
    this.deregisterListeners();
  },

  deregisterListeners() {
    this.errorListener.remove();
  },

  getInitialState() {
    return {
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      location : this.props.user.location,
      bio: this.props.user.bio,

      errors: []
     };
  },

  render() {
    return (
        <section className="user group transition">
          <header>
            <h1>Edit Profile</h1>
          </header>
          <div className="user-main form group">
            <form className="user-form" onSubmit={ this.updateUser }>

              <div className="form-row group">
                <label for="first-name">First</label>
                  <input id="first-name" type="text"
                    value={this.state.first_name}
                    onChange={ this.changeFirstName }/>

                <label for="last-name">Last</label>
                  <input id="last-name" type="text"
                    value={this.state.last_name}
                    onChange={ this.changeLastName }/>

                <label for="location">Location</label>
                  <input id="location" type="text"
                    value={this.state.location}
                    onChange={ this.changeLocation }/>

              </div>

              <div className="form-row group">
                <label for="bio">Bio</label>
                  <textarea id="bio"
                    value={this.state.bio}
                    onChange={ this.changeBio }/>
              </div>

              <FormErrors errors={ this.state.errors } />

              <button className="button bottom-right-button button-invert-color" type="submit" value="Update" >Save Changes</button>

            </form>
          </div>
        </section>
    );
  },

  updateUser(e) {

    e.preventDefault();

    let user = {
      id: this.props.user.id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      location : this.state.location,
      bio: this.state.bio
    };

    UserActions.updateUser(user);
  }

});


module.exports = ProfileEditForm;
