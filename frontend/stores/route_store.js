// react requires
const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatchers/dispatcher');

// project requires
const RouteConstants = require('../constants/route_constants');


// instance var
// this will store the routePoints
// key: order in which they are added ('name' from waypoint obj)
// value: waypoint (name, lat, lng, ele)
let _route = {};

const RouteStore = new Store(AppDispatcher);

RouteStore.all = () => {
  return Object.keys(_route).map((name) => {
    return _route[name];
  });
};

RouteStore.findRoutePoint = (routePoint_name) => {
  return Object.assign({}, _route[routePoint_name]);
};

RouteStore.__onDispatch = (payload) => {

  switch(payload.actionType) {
    case RouteConstants.RESET_ROUTE:
    RouteStore.resetRoute();
    break;

    case RouteConstants.RECEIVE_ROUTE_POINT:
    RouteStore.resetRoutePoint(payload.routePoint);
    break;
  }
};

RouteStore.resetRoute = () => {
  _route = {};
  RouteStore.__emitChange();
};

RouteStore.resetRoutePoint = (routePoint) => {
  _route[routePoint.name] = routePoint;
  RouteStore.__emitChange();
};


module.exports = RouteStore;
