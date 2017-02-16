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
