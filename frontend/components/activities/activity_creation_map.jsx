// react requires
const hashHistory   = require('react-router').hashHistory;
const React         = require('react');
const ReactDOM      = require('react-dom');

// project requires
const ActivityActions = require('../../actions/activity_actions');
const ActivityStore    = require('../../stores/activity_store');
const RouteActions  = require('../../actions/route_actions');
const SessionStore = require('../../stores/session_store');

let _numRoutPoints = 0;
// used to determine when to update route points on waypoint drag
let _draggedNotClicked = true;

const ActivityCreationMap = React.createClass({


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

  componentWillUnmount() {
    this.deregisterListeners();
  },

  deregisterListeners() {
    this.activityListener.remove();
    this.routeDisplayListener.remove();
  },

  distance() {
    let distance = this.state.distance.text;
    distance = distance.slice(0, distance.length - 3);
    return parseFloat(distance);
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

  encodedPolyline() {
    return this.routeDisplay.getDirections().routes[0].overview_polyline;
  },

  routeDistance() {
    return this.routeDisplay.getDirections().routes[0].legs[0].distance;
  },

  registerListeners() {

    this.map.addListener('click', this._handleClick);
    this.activityListener =
      ActivityStore.addListener(this.redirectToActivityDetail);
    this.routeDisplayListener =
      this.routeDisplay.addListener('directions_changed', this.updateRoute);
  },

  redirectToActivityDetail() {
    if (ActivityStore.newActivity() !== {}) {
      hashHistory.push({
        pathname: "/new-activity",
        query: { from: "creator" }
      });
    }
  },

  render() {
    return (
      <div>
        <div className="map" ref="map"></div>
        <div className="route-details">
          <p>{this.state.distance.text}</p>
          <button className="button" onClick={this.submitRoute} >Create!</button>
        </div>
      </div>
    );
  },

  route() {
    let steps = this.steps();
    let route = steps.map((step) => {
      return _googleLatLngToSimpleObject(step.start_location);
    });

    route.push(_googleLatLngToSimpleObject(steps[steps.length - 1].end_location));

    return route;
  },

  setupMap(center) {

    const mapDOMNode = ReactDOM.findDOMNode(this.refs.map);
    const mapOptions = {
      center: center,
      zoom: 13
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

  steps() {
    return this.routeDisplay.getDirections().routes[0].legs[0].steps;
  },

  submitRoute() {
    // translate to route
    if (this.origin && this.destination) {

      let activity = {
        route: this.route(),
        distance: this.distance(),
        encodedPolyline: this.encodedPolyline()
      };

      // add route to RouteStore to be received by ActivityForm component onmount
      ActivityActions.createNewActivity(activity);
    }
    else {
      // display error
    }

  },

  updateRoute() {
    let legs = this.legs();

    if (_draggedNotClicked) {
      this.origin = legs.start_location;
      this.destination = legs.end_location;
      this.waypoints = legs.via_waypoints || [];
    }

    this.setState({ distance: legs.distance });

    _draggedNotClicked = true;
  }
});

let _googleLatLngToSimpleObject = (latLng) => {
  return {
    lat: latLng.lat(),
    lng: latLng.lng()
  };
};



module.exports = ActivityCreationMap;
