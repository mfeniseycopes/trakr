// react requires
const hashHistory     = require('react-router').hashHistory;
const React           = require('react');

// project requires
const ErrorStore      = require('../../stores/error_store');
const FormErrors      = require('../errors/form_errors');
const UserActions  = require('../../actions/user_actions');
const SessionStore = require('../../stores/session_store');
const UserStore    = require('../../stores/user_store');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const ProfileDetail = React.createClass({

  render() {
    return (
      <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500}>
      <div className="user group transition">
        <div className="user-avatar-large">
          <img src={this.props.user.avatar_url} />
        </div>
        <div className="user-detail">
          <h3>{this.props.user.first_name} {this.props.user.last_name}</h3>
          <p>Member since {this.props.user.user_since}</p>
          <p>{this.props.user.location}</p>
          <p>{this.props.user.bio}</p>
        </div>
      </div>
      </ReactCSSTransitionGroup>
    );
  },

});


module.exports = ProfileDetail;
