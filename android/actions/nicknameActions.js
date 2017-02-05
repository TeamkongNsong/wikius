import { Actions } from 'react-native-router-flux';

import * as types from './actionTypes';

const requestCheckNickname = (nickname, check, checkNick) => ({
  type: types.REQUEST_CHECK_NICKNAME,
  check,
  nickname,
  checkNick,
});

const watingDelay = () => ({
  type: types.WATING_DELAY,
});

const requestConfirm = () => ({
  type: types.REQUEST_CONFIRM,
});

const nicknameConfirm = () => ({
  type: types.NICKNAME_CONFIRM,
});

let delay = setTimeout(() => {}, 0);

export function inputNickname(nickname) {
  return (dispatch, getState) => {
    dispatch(watingDelay());
    const { host } = getState().logInManager;

    const nicknameLength = nickname.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g,"$&$1$2").length;

    clearTimeout(delay);

    delay = setTimeout(() => {
      if (nicknameLength < 4) {
        dispatch(requestCheckNickname(nickname, true, `한글 2자(영문 4자) 이상으로 해주세요.`));
        return;
      }

      if (nicknameLength > 18) {
        dispatch(requestCheckNickname(nickname, true, `한글 6자(영문 18자) 이하로 해주세요.`));
        return;
      }

      fetch(`${host}/users/matchuser_nickname/${nickname}`)
      .then((res) => {
        console.log(res);
        const check = JSON.parse(res._bodyText);
        const checkNick =
          check
          ? `${nickname}는 이미 사용 중인 닉네임 입니다.`
          : `${nickname}는 사용 가능한 닉네임 입니다.`;

        dispatch(requestCheckNickname(nickname, check, checkNick));
      });
    }, 500);
  };
}

export function confirm() {
  return (dispatch, getState) => {
    dispatch(requestConfirm());
    const { user, host } = getState().logInManager;
    const { nickname } = getState().nicknameManager;

    fetch(`${host}/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.id,
        nickname,
        img: null,
        email: user.email,
      }),
    })
    .then(() => {
      Actions.main();
    });
  };
}
