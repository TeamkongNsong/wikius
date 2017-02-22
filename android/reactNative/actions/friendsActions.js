import { AsyncStorage } from 'react-native';

import * as types from './actionTypes';
import { host, key } from '../../../configure';

const loading = () => ({
  type: types.LOADING,
});

const refreshFriends = (friends, blocked, request, receive) => ({
  type: types.REFRESH_FRIENDS,
  friends,
  blocked,
  request,
  receive,
});

export function fetchFriends() {
  return (dispatch) => {
    dispatch(loading());

    return AsyncStorage.getItem(key)
      .then(data => {
        const parsedData = JSON.parse(data);
        return fetch(`${host}/friends/me`, {
          method: 'GET',
          headers: parsedData.headers,
        })
        .then((friendsData) => {
          const parsedFriendsInfo = JSON.parse(friendsData._bodyText).friendsInfo;

          return fetch(`${host}/users/me`, {
            method: 'GET',
            headers: parsedData.headers,
          })
          .then((myUserData) => {
            const parsedMyUser = JSON.parse(myUserData._bodyText).user;
            const friends = [];
            const blocked = [];
            const request = [];
            const receive = [];
            parsedFriendsInfo.forEach((friendInfo) => {
              if (friendInfo.status === 1) {
                friendInfo.from === parsedMyUser.idx
                  ? friends.push(friendInfo.to)
                  : friends.push(friendInfo.from);
              } else if (friendInfo.status === -1 && friendInfo.from !== parsedMyUser.idx) {
                blocked.push(friendInfo.from);
              } else if (friendInfo.status === 0) {
                friendInfo.from === parsedMyUser.idx
                  ? request.push(friendInfo.to)
                  : receive.push(friendInfo.from);
              }
            });

            dispatch(refreshFriends(friends, blocked, request, receive));
          });
        });
      });
  };
}

export function addFriend(nickname) {
  return (dispatch) => {
    dispatch(loading());

    return AsyncStorage.getItem(key)
      .then(data => JSON.parse(data))
      .then((parsedData) => {
        fetch(`${host}/friends/me`, {
          method: 'POST',
          headers: parsedData.headers,
          body: JSON.stringify({
            friend: nickname,
          }),
        });
      });
  };
}

export function cancelAddFriend(nickname) {
  return (dispatch) => {
    dispatch(loading());

    return AsyncStorage.getItem(key)
      .then(data => JSON.parse(data))
      .then((parsedData) => {
        fetch(`${host}/friends/me`, {
          method: 'DELETE',
          headers: parsedData.headers,
          body: JSON.stringify({
            friend: nickname,
          }),
        });
      });
  };
}
