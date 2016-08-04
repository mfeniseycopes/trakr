// react requires
const React = require('react');

const FormErrors = React.createClass({

  render() {
    if (this.props.errors.length > 0) {
      return (
        <ul className="form-error-list">
          { this.props.errors.map( (error) => {
            return <li>- { error }</li>; })
          }
        </ul>
      );
    }
    else {
      return null;
    }
  }

});

module.exports = FormErrors;
