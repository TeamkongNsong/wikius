import { Actions } from 'react-native-router-flux';

import * as types from './actionTypes';
import * as loginActions from './loginActions';

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

export function getTimelineOfUser(userIdx) {
  return (dispatch) => {
    dispatch(loading());

    return dispatch(loginActions.fetchWithHeaders('flags', 'GET'))
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
  };
}

export function moveToProfiles(userInProfile) {
  return (dispatch) => {
    dispatch(loading());

    return dispatch(loginActions.getMyData())
      .then((parsedMyUser) => {
        const isMine = parsedMyUser.idx === userInProfile.idx;

        dispatch(loginActions.fetchWithHeaders(`friends/me/${userInProfile.nickname}`, 'GET'))
        .then((friendsInfo) => {
          const parsedFriendsInfo = JSON.parse(friendsInfo._bodyText).friendsInfo[0];
          const isFriendStatus = parsedFriendsInfo === undefined
            ? (isMine ? 100 : 10)
            : (isMine ? 100 : parsedFriendsInfo.status);

          const friendFromMe = parsedFriendsInfo === undefined
            ? false
            : parsedFriendsInfo.from === parsedMyUser.idx;

          dispatch(getTimelineOfUser(userInProfile.idx))
          .then(() => {
            dispatch(refreshProfile(userInProfile));
            Actions.profiles({ isMine, isFriendStatus, friendFromMe });
          });
        });
      });
  };
}
