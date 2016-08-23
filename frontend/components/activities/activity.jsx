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

    if (!this.state.activity) {
      ActivityActions.getActivity(this.props.params.id);
    } else {
      this.createMap(this.state.activity.encoded_polyline);
    }
  },

  componentWillReceiveProps(newProps) {

    if (newProps === this.props) {return;}

    if (newProps !== this.props) {
      if (newProps.params.id) {
        ActivityActions.getActivity(newProps.params.id);

      }
      else {
        ActivityActions.getActivity(this.props.params.id);
      }
      if (newProps.location.pathname === this.props.params.id) {
        ErrorActions.clearErrors();
      }
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

    if (this.props.location.pathname === "/new-activity") {
      let activity = _blankActivity();

      if (this.props.location.query.from === "creator") {
        let newActivity = ActivityStore.newActivity();

        activity.distance = newActivity.distance;
        activity.route = newActivity.route;
        activity.encoded_polyline = newActivity.encodedPolyline;
      }

      return { activity: activity, edit: true, new: true };
    } else {
      return { activity: null };
    }
  },

  handleErrors() {
    if (ErrorStore.errors("activity").length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
    }
  },

  createMap(polyline) {

    var decodedPath = google.maps.geometry.encoding.decodePath(polyline);
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

  render() {

    if (this.state.error) {
      return <Error404 />;
    }
    else if (!this.state.activity) {
      return null;
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
                  <ActivityForm activity={this.state.activity} new={this.state.new}/> :
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

    if (this.props.location.pathname === "/new-activity") {
      hashHistory.push(`/activities/${ActivityStore.newActivity().id}`);
    }
    else {
      let activity = ActivityStore.find(parseInt(this.props.params.id));

      this.setState({
        activity: activity,
        edit: false,
        editable: activity.user.id === SessionStore.currentUser().id
      });
      this.createMap(activity.encoded_polyline);
    }

  },

  toggleButton() {
    if (this.state.editable) {
      return (
        <a onClick={ this.toggleModes } className="button symbol-button button-page-actions" >
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


let _blankActivity = () => {

  let date = new Date();
  let year = date.getFullYear();
  let month = ("00" + (date.getMonth() + 1)).slice(-2);
  let day = ("00" + date.getDate()).slice(-2);
  let hh = ("00" + date.getHours()).slice(-2);
  let mm = ("00" + date.getMinutes()).slice(-2);

  return {
    date: new Date().toDateString(),
    description: "",
    distance: 0,
    duration: 0,

    encoded_polyline: "",
    start: `${hh}:${mm}`,
    speed: 0
  };
};

module.exports = Activity;
