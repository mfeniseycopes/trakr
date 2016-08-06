// project requires
const AppDispatcher = require('../dispatchers/dispatcher');
const ErrorConstants = require('../constants/error_constants');

const RouteActions = {

  addRoutePoint(routePoint) {
    AppDispatcher.dispatch({
      actionType: RouteConstants.RECEIVE_ROUTE_POINT,
      routePoint: routePoint
    });
  },

  clearRoute(routePoint) {
    AppDispatcher.dispatch({
      actionType: RouteConstants.CLEAR_ROUTE
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
