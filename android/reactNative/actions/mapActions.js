import * as types from './actionTypes';

const loading = () => ({
  type: types.LOADING,
});

export const refreshGPS = region => ({
  type: types.REFRESH_GPS,
  region,
});

const setUserRegion = userRegion => ({
  type: types.SET_USER_REGION,
  userRegion,
});

const refreshFlags = flags => ({
  type: types.REFRESH_FLAGS,
  flags,
});

const initUserRegion = () => ({
  type: types.INIT_USER_REGION,
});

export const setScribbleInput = scribbleInput => ({
  type: types.SET_SCRIBBLE_INPUT,
  scribbleInput,
});

export const setFlagDetail = flagDetail => ({
  type: types.SET_FLAG_DETAIL,
  flagDetail,
});

export const setFlagDetailBody = flagDetailBody => ({
  type: types.SET_FLAG_DETAIL_BODY,
  flagDetailBody,
});

export function getUserRegion(cb) {
  return (dispatch, getState) => {
    dispatch(loading());
    const { region } = getState().mapManager;

    return navigator.geolocation.getCurrentPosition((position) => {
      const userRegion = Object.assign({}, region, {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      dispatch(setUserRegion(userRegion));
      dispatch(initUserRegion());
      if (cb !== undefined) cb();
    }, (err) => {
      console.log(err, "Can't use GPS");
      dispatch(setUserRegion(region));
      dispatch(initUserRegion());
      if (cb !== undefined) cb();
    }, {
      enableHighAccuracy: true,
      timeout: 3000,
    });
  };
}

export function initializeUserRegion() {
  return (dispatch) => {
    dispatch(loading());

    return dispatch(getUserRegion(() => {
      dispatch(initUserRegion());
    }));
  };
}

export function fetchFlags() {
  return (dispatch, getState) => {
    dispatch(loading());
    const { host } = getState().logInManager;

    return fetch(`${host}/flags`)
    .then((flags) => {
      dispatch(refreshFlags(JSON.parse(flags._bodyText)));
    });
  };
}

export function scribble(title, message) {
  return (dispatch, getState) => {
    dispatch(loading());
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
          title,
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

export function deleteFlag() {
  return (dispatch, getState) => {
    dispatch(loading());
    const { host } = getState().logInManager;
    const { idx } = getState().mapManager.flagDetail;

    return fetch(`${host}/flags/${idx}`, {
      method: 'DELETE',
    })
    .then(() => {
      dispatch(fetchFlags());
    });
  };
}
