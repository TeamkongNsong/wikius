import * as loginActions from './loginActions';
import * as types from './actionTypes';

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

    return dispatch(loginActions.fetchWithHeaders('users/me', 'GET'))
      .then((userData) => {
        const parsedUserData = JSON.parse(userData._bodyText).user;
        return parsedUserData;
      });
  };
}

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
