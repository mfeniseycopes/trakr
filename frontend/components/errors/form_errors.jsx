// react requires
const React = require('react');

const FormErrors = React.createClass({

  render() {

    return (
      <ul className="form-error-list">
        {
          this.props.errors.map(
            (error) => {
              return <li>- { error }</li>;
            }
          )
        }
      </ul>
    );
  }

});

module.exports = FormErrors;
