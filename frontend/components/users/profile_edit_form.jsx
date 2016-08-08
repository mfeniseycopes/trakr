// react requires
const hashHistory     = require('react-router').hashHistory;
const React           = require('react');

// project requires
const ErrorStore      = require('../../stores/error_store');
const FormErrors      = require('../errors/form_errors');
const UserActions  = require('../../actions/user_actions');
const UserStore    = require('../../stores/user_store');

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
      <form onSubmit={ this.updateUser }>
        <div className="user form group">
          <div className="user-avatar-large">
            <img src={ this.props.user.avatar_url } />
          </div>
          <div className="user-form">
            <div className="group user-form-names"><input type="text"
              value={this.state.first_name}
              onChange={ this.changeFirstName }/>
            <input type="text"
              value={this.state.last_name}
              onChange={ this.changeLastName }/></div>
            <input type="text"
              value={this.state.location}
              onChange={ this.changeLocation }/>
            <textarea
              value={this.state.bio}
              onChange={ this.changeBio }/>
            <FormErrors errors={ this.state.errors } />
            <button className="button form-button" type="submit" value="Update" >Update</button>
          </div>
        </div>
      </form>
    );
  },

  updateUser() {
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
