// react requires
const React           = require('react');

// project requires
const UserActions = require('../actions/user_actions');
const UserStore   = require('../stores/user_store');
const UserTable   = require('../components/users/user_table');
const ErrorStore      = require('../stores/error_store');
const SessionStore    = require('../stores/session_store');


const Explore = React.createClass({

  // when first mounts we need to get user based on current info
  componentDidMount() {
    this.userListener = UserStore.addListener(this.updateUsers);
    this.errorListener = ErrorStore.addListener(this.handleErrors);

    UserActions.getUsers();
  },

  componentWillUnmount() {
    this.deregisterListeners();
  },

  deregisterListeners() {
    this.userListener.remove();
    this.errorListener.remove();
  },

  getInitialState() {
    return { users: null };
  },

  handleErrors() {
    if (ErrorStore.errors("users").length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
    }
  },

  render() {
    if (this.state.error) {
      return <Error404 />;
    }
    else if (!this.state.users) {
      return null;
    }
    else {
      return (
        <div>
          <div className="page-header group">
            <h1>Explore</h1>
          </div>
          <div className="group">
            <div className="three-thirds">
              <UserTable users={this.state.users} />
            </div>
          </div>
        </div>
      );
    }
  },

  updateUsers() {
    this.setState({ users: UserStore.all() });
  }

});

module.exports = Explore;
