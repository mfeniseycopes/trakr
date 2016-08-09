// react requires
const hashHistory         = require('react-router').hashHistory;
const React               = require('react');
const ReactDOM            = require('react-dom');

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
    const mapDOMNode = ReactDOM.findDOMNode(this.refs.map);
    const mapOptions = {
      center: { lat: 0, lng: 0},
      zoom: 13
    };
    var decodedPath = google.maps.geometry.encoding.decodePath(this.props.activity.encoded_polyline);
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
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

    this.map.fitBounds(bounds);
    route.setMap(this.map);

  },

  render() {
    return (
      <div>
        <p>{this.props.activity.user.name} - {this.props.activity.activity_type.name}</p>
        <p>{this.props.activity.title}</p>
        <p>{this.props.activity.date}</p>
        <p>{this.props.activity.duration}</p>
        <p>{this.props.activity.distance}</p>
        <p>{this.props.activity.speed}</p>
        <p>{this.props.activity.description}</p>
        <div className="map" ref="map"></div>
      </div>
    );
  }

});

module.exports = ActivityDetail;
