import * as types from './actionTypes';

const requestGPS = () => ({
  type: types.REQUEST_GPS,
});

const refreshGPS = (check, coords) => ({
  type: types.REFRESH_GPS,
  check,
  coords,
});

export function checkGPS() {
  return (dispatch, getState) => {
    dispatch(requestGPS());
    const {
      region,
    } = getState().mapManager;

    return navigator.geolocation.getCurrentPosition((position) => {
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      dispatch(refreshGPS(true, coords));
    }, (err) => {
      const coords = {
        latitude: region.latitude,
        longitude: region.longitude,
      };
      dispatch(refreshGPS(false, coords));
    }, {
      enableHighAccuracy: true,
      timeout: 3000,
    });
  };
}
