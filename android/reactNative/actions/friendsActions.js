import * as types from './actionTypes';
import { host } from '../../../configure';

const loading = () => ({
  type: types.LOADING,
});

const refreshFriends = friends => ({
  type: types.REFRESH_FRIENDS,
  friends,
});

export function fetchFriends() {
  return (dispatch) => {
    dispatch(loading());

    return fetch(`${host}/friendsssssssssssssssssssssssssssss`)
      .then((friends) => {
        const parsedFriends = JSON.parse(friends._bodyText);
        if (parsedFriends.length === 0) return dispatch(refreshFriends([]));
        return dispatch(refreshFriends(parsedFriends));
      });
  };
}
