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
        <section className="user edit group transition">
          <header>
            <h1>Edit Profile</h1>
          </header>
          <div className="user-main form group">
            <form className="user-form" onSubmit={ this.updateUser }>

              <div className="form-row group">
                <label htmlFor="first-name">First</label>
                  <input id="first-name" type="text"
                    value={this.state.first_name}
                    onChange={ this.changeFirstName }/>

                  <label htmlFor="last-name">Last</label>
                  <input id="last-name" type="text"
                    value={this.state.last_name}
                    onChange={ this.changeLastName }/>
              </div>

              <div className="form-row group">
                <label htmlFor="location">Location</label>
                <input id="location" type="text"
                  value={this.state.location}
                  onChange={ this.changeLocation }/>
              </div>

              <div className="form-row group">
                <label htmlFor="bio">Bio</label>
                  <textarea id="bio"
                    value={this.state.bio}
                    onChange={ this.changeBio }/>
              </div>
              <div className="form-row group">
                <label htmlFor="bio">Avatar</label>
                <input id="location" type="file" onChange={this.updateAvatar} />
              </div>

              <FormErrors errors={ this.state.errors } />

              <button className="button button-invert-color" type="submit" value="Update" >Save Changes</button>

            </form>
          </div>
        </section>
    );
  },

  updateAvatar(e) {
    let user = new FormData();
    user.append("user[id]", this.props.user.id);
    user.append("user[avatar]", e.target.files[0]);
    UserActions.updateUserAvatar(this.props.user.id, user);
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
