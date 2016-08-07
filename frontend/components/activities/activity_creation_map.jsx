// react requires
const React         = require('react');
const ReactDOM      = require('react-dom');

// project requires
const RouteActions  = require('../../actions/route_actions');
const RouteStore    = require('../../stores/route_store');

let _numRoutPoints = 0;

const ActivityCreationMap = React.createClass({

  componentDidMount() {

    let styles = [{"stylers":[{"visibility":"on"},{"saturation":-100},{"gamma":0.54}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#4d4946"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"gamma":0.48}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"gamma":7.18}]}];

    const mapDOMNode = ReactDOM.findDOMNode(this.refs.map);
    const mapOptions = {
      center: { lat: 40.728558, lng: -73.982990}, // this is not SF
      zoom: 11,
      styles: styles
    };

    this.routeService = new google.maps.DirectionsService();
    this.routeDisplay = new google.maps.DirectionsRenderer({
      draggable: true
    });

    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    this.routeDisplay.setMap(this.map);

    this.registerListeners();
  },

  getInitialState() {
    return null;
  },

  _handleClick(e) {
    console.log('handleClick');
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    RouteActions.addRoutePoint({ lat: lat, lng: lng, name: ++_numRoutPoints });
  },

  registerListeners() {
    this.routeListener = RouteStore.addListener(this.resetRoute);

    this.map.addListener('click', this._handleClick);
  },

  render() {
    return (
      <div className="map clear" ref="map">

      </div>
    );
  },

  resetRoute() {

    console.log('resetRoute');

    // get all user inputted points
    this.routePoints = RouteStore.all();

    // no route or start pt
    if (this.routePoints.length === 0) {
      // remove old marker from map
      if (this.marker) {
        this.marker.setMap(null);
      }
    }

    // don't have a route yet, so just place a marker
    if (this.routePoints.length < 2) {

      // remove old marker from map
      if (this.marker) {
        this.marker.setMap(null);
      }

      // set new marker
      this.marker = new google.maps.Marker({
        position: {
          lat: this.routePoints[0].lat,
          lng: this.routePoints[0].lng
        },
        map: this.map,
        title: "Start"
      });
    }
    // we do have a route, so remove the marker & get directions
    else {
      // remove old marker from map
      if (this.marker) {
        this.marker.setMap(null);
      }

      // generate route request
      let origin = _googleLatLngFromRoutePoint(this.routePoints[0]);
      let destination = _googleLatLngFromRoutePoint(this.routePoints[this.routePoints.length-1]);
      let waypoints = _googleWaypointsFromRoutePoints(this.routePoints.slice(1, this.routePoints.length-1));

      var request = {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.WALKING
      };
      this.routeService.route(request, (response, status) => {
        if (status == 'OK') {
          this.routeDisplay.setDirections(response);
        }
      });
    }
  }

});

let _googleLatLngFromRoutePoint = (routePoint) => {
  return new google.maps.LatLng(routePoint.lat, routePoint.lng);
};

let _googleWaypointsFromRoutePoints = (routePoints) => {
  return routePoints.map((routePoint) => {
    return {
      location: _googleLatLngFromRoutePoint(routePoint)
    };
  });
};

module.exports = ActivityCreationMap;
