// project requires
const AppDispatcher = require('../dispatchers/dispatcher');
const ErrorConstants = require('../constants/error_constants');
const RouteConstants = require('../constants/route_constants');

const RouteActions = {

  addRoutePoint(routePoint) {
    console.log('addRoutePoint');
    AppDispatcher.dispatch({
      actionType: RouteConstants.RECEIVE_ROUTE_POINT,
      routePoint: routePoint
    });
  },

  clearRoute(routePoint) {
    AppDispatcher.dispatch({
      actionType: RouteConstants.RESET_ROUTE
    });
  },

  changeRoutePoint(routePoint) {
    AppDispatcher.dispatch({
      actionType: RouteConstants.RECEIVE_ROUTE_POINT,
      routePoint: routePoint
    });
  }

};

module.exports = RouteActions;
