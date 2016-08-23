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
        <div className="user group transition">
          <div className="user-main group">
            <div className="user-left">
              <div className="user-avatar-large">
                <img src={this.props.user.avatar_url} />
              </div>

              <div className="user-detail">

                <div className="user-detail-row">
                  <h1>{this.props.user.first_name} {this.props.user.last_name}</h1>
                </div>

                <div className="user-detail-row">
                  <h5>Trakring since {this.props.user.user_since}</h5>
                </div>

                <div className="user-detail-row">
                  <h5>{this.props.user.location}</h5>
                </div>

                <div className="user-detail-row">
                  <p>{this.props.user.bio}</p>
                </div>

              </div>
            </div>
          </div>
        </div>
    );
  },

});


module.exports = ProfileDetail;
