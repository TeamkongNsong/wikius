import { Actions } from 'react-native-router-flux';
import * as types from './actionTypes';

import { host } from '../../../configure';

const loading = () => ({
  type: types.LOADING,
});

const checkProperId = (id, check, checkDuplicatedId) => ({
  type: types.CHECK_PROPER_ID,
  id,
  check,
  checkDuplicatedId,
});

const refreshCheckProperPasswordText = checkProperPasswordText => ({
  type: types.REFRESH_CHECK_PROPER_PASSWORD_TEXT,
  checkProperPasswordText,
});

let delay = setTimeout(() => {}, 0);

export const inputPassword = password => ({
  type: types.INPUT_PASSWORD,
  password,
});

export const inputPassword2 = password2 => ({
  type: types.INPUT_PASSWORD2,
  password2,
});

export function inputId(id) {
  return (dispatch) => {
    dispatch(loading());
    const idLength = id.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length;

    clearTimeout(delay);

    delay = setTimeout(() => {
      if (idLength < 6) return dispatch(checkProperId(id, true, '영문 6자 이상으로 해주세요.'));
      if (idLength > 12) return dispatch(checkProperId(id, true, '영문 12자 이하로 해주세요.'));

      return fetch(`${host}/users/matchuser_id/${id}`)
      .then((res) => {
        const check = JSON.parse(res._bodyText).check;
        let checkDuplicatedId = ' ';
        checkDuplicatedId = check ? `${id}는 이미 사용 중인 ID 입니다.` : `${id}는 사용 가능한 ID 입니다.`;

        dispatch(checkProperId(id, check, checkDuplicatedId));
      });
    }, 500);
  };
}

export function checkProperPassword() {
  return (dispatch, getState) => {
    dispatch(loading());
    const { password, password2 } = getState().registerManager;
    const passwordLength = password.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length;

    clearTimeout(delay);

    let checkProperPasswordText = ' ';

    delay = setTimeout(() => {
      if (passwordLength < 8) checkProperPasswordText = '비밀번호는 8자 이상으로 해주세요.';
      else if (passwordLength > 16) checkProperPasswordText = '비밀번호는 16자 이하로 해주세요.';
      else if (password2 !== null) {
        if (password2.length > 0 && password !== password2) checkProperPasswordText = '비밀번호가 서로 다릅니다.';
        else checkProperPasswordText = 'good';
      }

      return dispatch(refreshCheckProperPasswordText(checkProperPasswordText));
    }, 500);
  };
}

export function registerConfirm() {
  return (dispatch, getState) => {
    dispatch(loading());
    const { id, password, password2 } = getState().registerManager;

    return fetch(`${host}/auth/wiki/sign-up`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: id,
        password,
        password2,
      }),
    })
    .then((res) => {
      const parsedData = JSON.parse(res._bodyText);
      if (parsedData.statusCode === 200) {
        return Actions.logIn();
      }
      return dispatch(refreshCheckProperPasswordText('에러가 발생했습니다.'));
    });
  };
}
