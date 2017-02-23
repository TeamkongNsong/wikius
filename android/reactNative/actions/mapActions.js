import * as types from './actionTypes';
import * as loginActions from './loginActions';

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

export const refreshMap = map => ({
  type: types.REFRESH_MAP,
  map,
});

export function getUserRegion(cb, animRegion) {
  return (dispatch, getState) => {
    dispatch(loading());
    const { region } = getState().mapManager;

    return navigator.geolocation.getCurrentPosition((position) => {
      const userRegion = Object.assign({}, region, {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.009927655360755239,
        longitudeDelta: 0.015449859201908112,
      });

      dispatch(setUserRegion(userRegion));
      animRegion ? dispatch(refreshGPS(animRegion)) : dispatch(initUserRegion());
      if (cb !== undefined) cb();
    }, (err) => {
      console.log(err, "Can't use GPS");

      dispatch(setUserRegion(region));
      animRegion ? dispatch(refreshGPS(animRegion)) : dispatch(initUserRegion());
      if (cb !== undefined) cb();
    }, {
      enableHighAccuracy: true,
      timeout: 3000,
    });
  };
}

export function fetchFlags(n = 100) {
  return (dispatch, getState) => {
    dispatch(loading());
    const { region } = getState().mapManager;

    const calcNearest = (myRegion, flags, numberOfFlags) => {
      if (flags.length < numberOfFlags) {
        return flags;
      }
      const result = [];
      const subResult = [];
      flags.forEach((flag, index) => {
        const distance
          = Math.sqrt(((myRegion.latitude - flag.latitude) * (myRegion.latitude - flag.latitude))
          + ((myRegion.longitude - flag.longitude) * (myRegion.longitude - flag.longitude)));

        subResult.push([distance, index]);
      });

      subResult.sort((a, b) => a[0] - b[0]);
      for (let i = 0; i < numberOfFlags; i += 1) {
        result.push(flags[subResult[i][1]]);
      }

      return result;
    };

    return dispatch(loginActions.fetchWithHeaders('flags', 'GET'))
      .then((flags) => {
        const parsedFlags = JSON.parse(flags._bodyText).flags;
        const nearestFlags = calcNearest(region, parsedFlags, n);
        dispatch(refreshFlags(nearestFlags));
      });
  };
}

export function scribble(title, message) {
  return (dispatch, getState) => {
    dispatch(loading());

    return dispatch(getUserRegion(() => {
      const { userRegion } = getState().mapManager;
      const region = userRegion;

      return dispatch(loginActions.fetchWithHeaders('flags/me', 'POST', {
        title,
        region,
        message,
      }))
      .then(() => {
        dispatch(fetchFlags());
      });

      /*--------------- Test Code ---------------*/
      // for (let i = 0; i < 30000; i += 1) {
      //   const region = {
      //     latitude: (Math.random() * 166) - 83,
      //     longitude: (Math.random() * 360) - 180,
      //   };
      //
      //   fetch(`${host}/flags`, {
      //     method: 'POST',
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       title,
      //       nickname,
      //       region,
      //       message,
      //     }),
      //   })
      //   .then(() => {
      //     dispatch(fetchFlags());
      //   });
      // }
      /*--------------- Test Code ---------------*/
    }));
  };
}

export function deleteFlag() {
  return (dispatch, getState) => {
    dispatch(loading());
    const { idx } = getState().mapManager.flagDetail;

    return dispatch(loginActions.fetchWithHeaders('flags/me', 'DELETE', {
      idx,
    }))
    .then(() => {
      dispatch(fetchFlags());
    });
  };
}
