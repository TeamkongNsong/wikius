import * as types from '../actions/actionTypes';

const initialState = {
  region: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  },
  checkGPS: false,
};

const mapManager = (state = initialState, action) => {
  switch (action.type) {
    case types.REFRESH_GPS: {
      if (!action.check) {
        return Object.assign({}, state, {
          checkGPS: action.check,
        });
      }
      return Object.assign({}, state, {
        checkGPS: action.check,
        region: Object.assign({}, state.region, {
          latitude: action.latitude,
          longitude: action.longitude,
        }),
      });
    }

    default:
      return state;
  }
};

export default mapManager;
