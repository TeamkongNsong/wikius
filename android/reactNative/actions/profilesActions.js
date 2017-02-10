import * as types from './actionTypes';

const loading = () => ({
  type: types.LOADING,
});

const refreshProfile = userInProfile => ({
  type: types.REFRESH_PROFILE,
  userInProfile,
});

export function fetchProfile(callback) {
  return (dispatch, getState) => {
    const { user, host } = getState().logInManager;
    dispatch(loading());

    return fetch(`${host}/users/${user.id}`)
    .then((data) => {
      const parsedData = JSON.parse(data._bodyText);
      const userInProfile = {
        image: parsedData.img || '기본 이미지',
        nickname: parsedData.nickname,
        stateMessage: parsedData.state_message || '상태메시지를 입력해주세요',
      };
      dispatch(refreshProfile(userInProfile));
      callback();
    })
  };
}
