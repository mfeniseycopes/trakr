// react requires
const React           = require('react');

// project requires
const UserStore    = require('../../stores/user_store');

const Progress = React.createClass({

  render() {

    return (
      <section className="progress-pane">
        Progress Pane
      </section>
    );
  }

});

module.exports = Progress;
