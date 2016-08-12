// react requires
const React           = require('react');
const UserActions     = require('../../actions/user_actions');

// project requires


const FollowButton = React.createClass({

  render() {
    let classNm = this.props.user.following ? "following" : "not-following";

    return (
      <button className={`button follow-button button-page-actions ${classNm}`} onClick={this.toggleFollow}>

      </button>
    );
  },

  toggleFollow() {
    UserActions.toggleFollow(this.props.user);
  }

});

module.exports = FollowButton;
