// react
const React = require('react');

// project requires

const Error404 = React.createClass({

  render() {
    return (
      <div className="four-o-four">
        <img className="pulse animated infinite" src={window.TrakrAssets.image404} />
      </div>
    );
  }

});

module.exports = Error404;
