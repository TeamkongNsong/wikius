import * as loginActions from './loginActions';
import * as types from './actionTypes';

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

    return dispatch(loginActions.fetchWithHeaders('friends/me', 'GET'))
      .then((friendsData) => {
        const parsedFriendsInfo = JSON.parse(friendsData._bodyText).friendsInfo;

        return dispatch(loginActions.fetchWithHeaders('users/me', 'GET'))
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
  };
}

export function addFriend(nickname) {
  return (dispatch) => {
    dispatch(loading());

    return dispatch(loginActions.fetchWithHeaders('friends/me', 'POST', {
      friend: nickname,
    }));
  };
}

export function cancelAddFriend(nickname) {
  return (dispatch) => {
    dispatch(loading());

    return dispatch(loginActions.fetchWithHeaders('friends/me', 'DELETE', {
      friend: nickname,
    }));
  };
}
