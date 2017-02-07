import * as types from './actionTypes';
import MapView from 'react-native-maps';


const requestGPS = () => ({
  type: types.REQUEST_GPS,
});

export const refreshGPS = region => ({
  type: types.REFRESH_GPS,
  region,
});

const waitingPostFlag = () => ({
  type: types.WATING_POST_FLAG,
});

const setUserRegion = userRegion => ({
  type: types.SET_USER_REGION,
  userRegion,
});

const waitingFetchFlags = () => ({
  type: types.WAITING_FETCH_FLAGS,
});

const refreshFlags = flags => ({
  type: types.REFRESH_FLAGS,
  flags,
});

const requestInitUserRegion = () => ({
  type: types.REQUEST_INIT_USER_REGION,
});

const initUserRegion = () => ({
  type: types.INIT_USER_REGION,
});

export function getUserRegion(cb) {
  return (dispatch, getState) => {
    dispatch(requestGPS());
    const { region } = getState().mapManager;

    return navigator.geolocation.getCurrentPosition((position) => {
      const userRegion = Object.assign({}, region, {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      dispatch(setUserRegion(userRegion));
      if (cb !== undefined) cb();
    }, (err) => {
      console.log(err, "Can't use GPS");
      dispatch(setUserRegion(region));
      if (cb !== undefined) cb();
    }, {
      enableHighAccuracy: true,
      timeout: 3000,
    });
  };
}

export function initializeUserRegion() {
  return (dispatch) => {
    dispatch(requestInitUserRegion());

    return dispatch(getUserRegion(() => {
      dispatch(initUserRegion());
    }));
  };
}

export function fetchFlags() {
  return (dispatch, getState) => {
    dispatch(waitingFetchFlags());
    const { host } = getState().logInManager;

    return fetch(`${host}/flags`)
    .then((flags) => {
      dispatch(refreshFlags(JSON.parse(flags._bodyText)));
    });
  };
}

export function scribble(message) {
  return (dispatch, getState) => {
    dispatch(waitingPostFlag());
    const { nickname } = getState().nicknameManager;
    const { host } = getState().logInManager;

    return dispatch(getUserRegion(() => {
      const { userRegion } = getState().mapManager;
      const region = userRegion;

      fetch(`${host}/flags`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname,
          region,
          message,
        }),
      })
      .then(() => {
        dispatch(fetchFlags());
      });
    }));
  };
}
