// react requires
const hashHistory         = require('react-router').hashHistory;
const React               = require('react');
const ReactDOM            = require('react-dom');

// project requires
const ActivityActions     = require('../../actions/activity_actions');
const ActivityCreationMap = require('./activity_creation_map');
const ActivityDetail      = require('./activity_detail');
const ActivityForm        = require('./activity_form');
const ActivityStore       = require('../../stores/activity_store');
const ActivityTypeActions = require('../../actions/activity_type_actions');
const ActivityTypeStore   = require('../../stores/activity_type_store');
const Error404            = require('../error_404');
const ErrorActions     = require('../../actions/error_actions');
const ErrorStore          = require('../../stores/error_store');
const FormErrors          = require('../errors/form_errors');
const SessionStore        = require('../../stores/session_store');

const Activity = React.createClass({

  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.handleErrors);
    this.activityListener = ActivityStore.addListener(this.resetActivity);
    ActivityActions.getActivity(this.props.params.id);
  },

  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      ActivityActions.getActivity(this.props.params.id);
      ErrorActions.clearErrors();
    }
  },

  componentWillUnmount() {
    this.deregisterListeners();
  },

  deregisterListeners() {
    this.errorListener.remove();
    this.activityListener.remove();
  },

  getInitialState() {
    return { activity: null };
  },

  handleErrors() {
    if (ErrorStore.errors("activity").length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
    }
  },

  render() {

    if (this.state.error) {
      return <Error404 />;
    }
    else if (!this.state.activity) {
      return <div></div>;
    }
    else {
      return (
        <div className="group">
          <div className="page-header group">
            <h1>Activity</h1>{ this.toggleButton() }
          </div>
          <div>
            <div className="three-thirds">
              {
                this.state.edit ?
                  <ActivityForm activity={this.state.activity} /> :
                  <ActivityDetail activity={this.state.activity} />
              }
            </div>
          </div>
          <div id="map" className="activity-map" ref="map"></div>
        </div>

      );
    }
  },

  resetActivity() {
    let activity = ActivityStore.find(this.props.params.id);
    this.setState({
      activity: activity,
      edit: false,
      editable: activity.user.id === SessionStore.currentUser().id
    });


    var decodedPath = google.maps.geometry.encoding.decodePath(this.state.activity.encoded_polyline);
    let route = new google.maps.Polyline({
      path: decodedPath,
      strokeWeight: 5,
      strokeColor: "#277455",
      strokeOpacity: 0.8
    });

    var bounds = new google.maps.LatLngBounds();
    var path = route.getPath();
    for (var i = 0; i < path.getLength(); i++) {
       bounds.extend(path.getAt(i));
    }

    const mapDOMNode = ReactDOM.findDOMNode(this.refs.map);
    const mapOptions = {
      center: { lat: 0, lng: 0},
      zoom: 13
    };

    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    this.map.fitBounds(bounds);
    route.setMap(this.map);
  },

  toggleButton() {
    if (this.state.editable) {
      return (
        <a onClick={ this.toggleModes } className="button symbol-button" >
          { this.state.edit ? "✕" : "🖉" }
        </a>
      );
    }
    else {
      return "";
    }
  },

  toggleModes() {
    this.setState({ edit: !this.state.edit });
  }

});

let _emptyActivity = {
  user_name: "",
  activity_type_name: "",
  title: "",
  description: "",
  date: "",
  distance: 0,
  duration: 0,
  speed: 0
};

module.exports = Activity;
