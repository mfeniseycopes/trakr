// react requires
const React           = require('react');

// project requires
const ActivityStore   = require('../../stores/user_store');
const ErrorStore      = require('../../stores/error_store');
const SessionStore    = require('../../stores/session_store');

const ActvitiesTable = React.createClass({

  componentDidMount() {
    this.activityListener = 1;
  },

  componentWillUnmount() {
    this.deregisterListeners();
  },

  deregisterListeners() {
    this.activityListener.remove();
    this.errorListener.remove();
  },


  getInitialState() {
    return { activities: [] };
  },

  render() {
    return (
      <section className="activities-table">
        Activities Table
      </section>
    );
  }

});

module.exports = ActvitiesTable;
