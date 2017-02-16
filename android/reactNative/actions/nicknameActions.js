import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import { key, host } from '../../../configure';

import * as types from './actionTypes';

const requestCheckNickname = (nickname, check, checkDuplicatedNick, modified) => ({
  type: types.REQUEST_CHECK_NICKNAME,
  check,
  nickname,
  checkDuplicatedNick,
  modified,
});

const loading = () => ({
  type: types.LOADING,
});

export const refreshNickname = nickname => ({
  type: types.REFRESH_NICKNAME,
  nickname,
});

let delay = setTimeout(() => {}, 0);

export function inputNickname(nickname) {
  return (dispatch) => {
    dispatch(loading());
    const nicknameLength = nickname.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length;

    clearTimeout(delay);

    delay = setTimeout(() => {
      if (nicknameLength < 4) {
        dispatch(requestCheckNickname(nickname, true, '한글 2자(영문 4자) 이상으로 해주세요.', false));
        return;
      }

      if (nicknameLength > 18) {
        dispatch(requestCheckNickname(nickname, true, '한글 6자(영문 18자) 이하로 해주세요.', false));
        return;
      }

      let currentNickname = null;
      let modified = false;

      AsyncStorage.getItem(key)
      .then(data => JSON.parse(data))
      .then((parsedData) => {
        fetch(`${host}/auth/check/nickname`, {
          method: 'GET',
          headers: parsedData.headers,
        })
        .then((userInfo) => {
          const parsedUserInfo = JSON.parse(userInfo._bodyText);
          if (parsedUserInfo.check) {
            currentNickname = parsedUserInfo.nickname;
            modified = true;
          }
        })
        .then(() => {
          fetch(`${host}/users/matchuser_nickname/${nickname}`)
          .then((res) => {
            const check = JSON.parse(res._bodyText).check;
            let checkDuplicatedNick = ' ';

            if (!check) {
              checkDuplicatedNick = `${nickname}는 사용 가능한 닉네임 입니다.`;
            } else {
              checkDuplicatedNick = (currentNickname === nickname)
                ? `${nickname}는 현재 사용 중인 닉네임 입니다.`
                : `${nickname}는 이미 사용 중인 닉네임 입니다.`;
            }

            dispatch(requestCheckNickname(nickname, check, checkDuplicatedNick, modified));
          });
        });
      });
    }, 500);
  };
}

export function confirm() {
  return (dispatch, getState) => {
    dispatch(loading());
    const { nickname, modified } = getState().nicknameManager;
    console.log(nickname, modified);

    return AsyncStorage.getItem(key)
      .then(data => JSON.parse(data))
      .then((parsedData) => {
        fetch(`${host}/auth/nickname`, {
          method: 'PUT',
          headers: parsedData.headers,
          body: JSON.stringify({
            nickname,
          }),
        })
        .then(() => {
          if (modified) {
            Actions.pop();
          } else {
            Actions.main();
          }
        });
      });
  };
}
