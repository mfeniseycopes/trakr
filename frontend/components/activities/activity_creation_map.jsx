// react requires
const React         = require('react');
const ReactDOM      = require('react-dom');

// project requires
const RouteActions  = require('../../actions/route_actions');
const RouteStore    = require('../../stores/route_store');
const SessionStore = require('../../stores/session_store');

let _numRoutPoints = 0;
// used to determine when to update route points on waypoint drag
let _draggedNotClicked = true;

const ActivityCreationMap = React.createClass({

  updateRoute() {
    let legs = this.legs();

    if (_draggedNotClicked) {
      this.origin = legs.start_location;
      this.destination = legs.end_location;
      this.waypoints = legs.via_waypoints || [];
    }

    this.setState({ distance: legs.distance });

    _draggedNotClicked = true;
  },

  componentDidMount() {

    if (SessionStore.currentUser().location) {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        address: SessionStore.currentUser().location },
        (results, status) => {
          if (status === "OK") {
            this.setupMap(results[0].geometry.location);
          }
          else {
            this.setupMap(new google.maps.LatLng({ lat: 40.6781784, lng: -73.9441579 }));
          }
        }
      );
    }
    else {
      this.setupMap(new google.maps.LatLng({ lat: 40.6781784, lng: -73.9441579 }));
    }
  },

  getInitialState() {
    return {
      distance: 0
    };
  },

  _handleClick(e) {
    // add to routePoints

    // only one point, no route yet
    if (!this.origin) {

      this.origin = e.latLng;

      this.marker = new google.maps.Marker({
        position: {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        },
        map: this.map,
        title: "Start"
      });
    }
    // yay, lets start a route
    else {
      // set as click event (prevent full resync of route points)
      _draggedNotClicked = false;

      // clear the marker
      this.marker.setMap(null);

      // get directions
      // generate route request
      if (this.destination) {
        this.waypoints.push(this.destination);
      }
      this.destination = e.latLng;

      // create request
      var request = {
        origin: this.origin,
        destination: this.destination,
        waypoints: this.waypoints.map((waypoint) => {
          return {
            location: waypoint,
            stopover: false
          };
        }),
        travelMode: google.maps.TravelMode.WALKING
      };

      this.routeService.route(request, (response, status) => {
        if (status === 'OK') {
          this.routeDisplay.setDirections(response);
        }
      });
    }
  },

  legs() {
    return this.routeDisplay.getDirections().routes[0].legs[0];
  },

  routeDistance() {
    return this.routeDisplay.getDirections().routes[0].legs[0].distance;
  },

  registerListeners() {

    this.routeListener = RouteStore.addListener(this.resetRoute);

    this.map.addListener('click', this._handleClick);
    this.routeDisplay.addListener('directions_changed', this.updateRoute);
  },

  render() {
    return (
      <div>
        <div className="map" ref="map">

        </div>
        <div className="route-details">
          <p>{this.state.distance.text}</p>
          <p>Maybe a button goes here</p>
          <button onClick={this.submitRoute} />
        </div>
      </div>
    );
  },

  setupMap(center) {

    let styles = [{"stylers":[{"visibility":"on"},{"saturation":-100},{"gamma":0.54}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#4d4946"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"gamma":0.48}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"gamma":7.18}]}];

    const mapDOMNode = ReactDOM.findDOMNode(this.refs.map);
    const mapOptions = {
      center: center,
      zoom: 13,
      styles: styles
    };

    this.routeService = new google.maps.DirectionsService();
    this.routeDisplay = new google.maps.DirectionsRenderer({
      draggable: true
    });

    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    this.routeDisplay.setMap(this.map);
    // keeps track of route info
    this.origin = null;
    this.destination = null;
    this.waypoints = [];

    this.registerListeners();
  },

  submitRoute() {

  }

});



module.exports = ActivityCreationMap;
