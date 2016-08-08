// react requires
const hashHistory         = require('react-router').hashHistory;
const React               = require('react');

// project requires
const ActivityActions     = require('../../actions/activity_actions');
const ActivityCreationMap = require('./activity_creation_map');
const ActivityStore       = require('../../stores/activity_store');
const ActivityTypeActions = require('../../actions/activity_type_actions');
const ActivityTypeStore   = require('../../stores/activity_type_store');
const ErrorStore          = require('../../stores/error_store');
const FormErrors          = require('../errors/form_errors');

const ActivityDetail = React.createClass({

  componentDidMount() {

  },
  //
  // componentWillUnmount() {
  //
  // },
  //
  getInitialState() {


    if (ActivityStore.find(this.props.params.id)) {
      
    } else {
      ActivityActions.getActivity(this.props.params.id);
    }
  },

  render() {
    return <h1>ActivityDetail</h1>;
  }

});

module.exports = ActivityDetail;
