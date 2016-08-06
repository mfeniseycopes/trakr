// react requires
const React         = require('react');
const ReactDOM      = require('react-dom');

// project requires
const RouteActions  = require('../../actions/route_actions');
const RouteStore    = require('../../stores/route_store');

const ActivityCreationMap = React.createClass({

  componentDidMount() {

    let styles = [{"stylers":[{"visibility":"on"},{"saturation":-100},{"gamma":0.54}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#4d4946"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"gamma":0.48}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"gamma":7.18}]}];

    const mapDOMNode = ReactDOM.findDOMNode(this.refs.map);
    const mapOptions = {
      center: { lat: 40.728558, lng: -73.982990}, // this is not SF
      zoom: 11,
      styles: styles
    };
    this.map = new google.maps.Map(mapDOMNode, mapOptions);

    console.log("map rendered");
  },

  getInitialState() {
    return null;
  },

  render() {
    return (
      <div className="map clear" ref="map">

      </div>
    );
  }

});

module.exports = ActivityCreationMap;
