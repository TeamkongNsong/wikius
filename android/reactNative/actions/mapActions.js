import { AsyncStorage } from 'react-native';

import * as types from './actionTypes';
import { host, key } from '../../../configure';

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

export const setZoomLevelState = zoomLevel => ({
  type: types.SET_ZOOM_LEVEL_STATE,
  zoomLevel,
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

    return AsyncStorage.getItem(key)
      .then(data => JSON.parse(data))
      .then((parsedData) => {
        fetch(`${host}/flags`, {
          method: 'GET',
          headers: parsedData.headers,
        })
        .then((flags) => {
          const parsedFlags = JSON.parse(flags._bodyText).flags;
          const nearestFlags = calcNearest(region, parsedFlags, n);
          dispatch(refreshFlags(nearestFlags));
        });
      });
  };
}

export function scribble(title, message) {
  return (dispatch, getState) => {
    dispatch(loading());

    return dispatch(getUserRegion(() => {
      const { userRegion } = getState().mapManager;
      const region = userRegion;

      return AsyncStorage.getItem(key)
        .then(data => JSON.parse(data))
        .then((parsedData) => {
          fetch(`${host}/flags/me`, {
            method: 'POST',
            headers: parsedData.headers,
            body: JSON.stringify({
              title,
              region,
              message,
            }),
          })
          .then(() => {
            dispatch(fetchFlags());
          });
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

    return AsyncStorage.getItem(key)
      .then(data => JSON.parse(data))
      .then((parsedData) => {
        fetch(`${host}/flags/me`, {
          method: 'DELETE',
          headers: parsedData.headers,
          body: JSON.stringify({
            idx
          }),
        })
        .then(() => {
          dispatch(fetchFlags());
        });
      });
  };
}
