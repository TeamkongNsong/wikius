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
  return (dispatch) => {
    dispatch(requestGPS());

    return navigator.geolocation.getCurrentPosition((position) => {
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      console.log('is here', coords);

      dispatch(refreshGPS(true, coords));
    }, (err) => {
      console.log('handle err', err);

      dispatch(refreshGPS(false));
    }, {
      enableHighAccuracy: true,
      timeout: 3000,
    });
  };
}
