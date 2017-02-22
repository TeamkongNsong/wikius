import { AsyncStorage } from 'react-native';

import * as types from './actionTypes';
import { host, key } from '../../../configure';

const loading = () => ({
  type: types.LOADING,
});

export const refreshProfile = userInProfile => ({
  type: types.REFRESH_PROFILE,
  userInProfile,
});

const refreshTimeline = timeline => ({
  type: types.REFRESH_TIMELINE,
  timeline,
});

export function getMyData() {
  return (dispatch) => {
    dispatch(loading());

    return AsyncStorage.getItem(key)
      .then(data => JSON.parse(data))
      .then((parsedData) => {
        return fetch(`${host}/users/me`, {
          method: 'GET',
          headers: parsedData.headers,
        })
        .then((userData) => {
          const parsedUserData = JSON.parse(userData._bodyText).user;
          return parsedUserData;
        });
      });
  };
}

export function getTimelineOfUser(userIdx) {
  return (dispatch) => {
    dispatch(loading());

    return AsyncStorage.getItem(key)
      .then(data => JSON.parse(data))
      .then((parsedData) => {
        return fetch(`${host}/flags`, {
          method: 'GET',
          headers: parsedData.headers,
        })
        .then((userData) => {
          const parsedUserData = JSON.parse(userData._bodyText).flags;
          const result = [];
          parsedUserData.forEach((post) => {
            if (post.user_idx === userIdx) {
              result.push(post);
            }
          });
          dispatch(refreshTimeline(result));
          return result;
        });
      });
  };
}
