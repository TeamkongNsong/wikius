import OAuthManager from 'react-native-oauth';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import { AsyncStorage } from 'react-native';

import { OAuthConfig, productName, host, key, serviceIssuerConfig } from '../../../configure';
import * as types from './actionTypes';

const manager = new OAuthManager(productName);

const config = OAuthConfig;
manager.configure(config);

export const changeIdOnTextInput = idOnTextInput => ({
  type: types.CHANGE_ID_ON_TEXT_INPUT,
  idOnTextInput,
});

export const changePasswordOnTextInput = passwordOnTextInput => ({
  type: types.CHANGE_PASSWORD_ON_TEXT_INPUT,
  passwordOnTextInput,
});

const loading = () => ({
  type: types.LOADING,
});

export function saveSecretData(data) {
  return AsyncStorage.setItem(key, JSON.stringify(data))
    .then(() => console.log(`data 저장: ${JSON.stringify(data)}`))
    .catch(err => console.log(`data 저장 실패!! ${err}`));
}

export function removeSecretData() {
  const data = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': null,
      'service_issuer': null,
      'device_info': null,
    },
  };

  return AsyncStorage.mergeItem(key, JSON.stringify(data))
    .then(() => console.log('data 삭제!'))
    .catch(err => console.log(`data 삭제 실패!! ${err}`));
}

export function logIn(serviceIssuer, id, password) {
  return (dispatch) => {
    dispatch(loading());
    let user_id = id;

    return new Promise((resolve) => {
      const data = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': null,
          'service_issuer': serviceIssuer,
          'device_info': DeviceInfo.getUniqueID(),
        },
      };

      if (serviceIssuer === 'wiki') return resolve(data);

      return manager.authorize(serviceIssuer, serviceIssuerConfig[serviceIssuer].options)
      .then((loginInfo) => {
        const accessToken = loginInfo.response.credentials.accessToken;

        manager.makeRequest(serviceIssuer, serviceIssuerConfig[serviceIssuer].url)
        .then((userData) => {
          data.headers['x-access-token'] = accessToken;
          user_id = userData.data.emails[0].value;

          console.log(`${user_id} 로그인!`);
          saveSecretData(data)
          .then(() => resolve(data));
        })
        .catch(err => console.log('유저 정보 요청 실패!', err));
      })
      .catch(err => console.log('로그인 에러 발생!', err));
    })
    .then((data) => {
      fetch(`${host}/auth/sign-in`, {
        method: 'POST',
        headers: data.headers,
        body: JSON.stringify({
          user_id,
          password: password || 'null',
        }),
      })
      .then((res) => {
        const check = JSON.parse(res._bodyText).data.check;
        if (serviceIssuer === 'wiki') {
          const wikiData = Object.assign(data, {
            headers: Object.assign(data.headers, {
              'x-access-token': JSON.parse(res._bodyText).data.token,
            }),
          });

          return saveSecretData(wikiData)
            .then(() => {
              return check ? Actions.main() : Actions.makeNickname();
            });
        }
        return check ? Actions.main() : Actions.makeNickname();
      })
      .catch(console.log);
    })
    .catch(console.log);
  };
}

export function logOut() {
  return (dispatch) => {
    dispatch(loading());

    AsyncStorage.getItem(key)
    .then(data => JSON.parse(data))
    .then((parsedData) => {
      return fetch(`${host}/auth/sign-out`, {
        method: 'PUT',
        headers: parsedData.headers,
      })
      .then((res) => {
        const serviceIssuer = parsedData.headers.service_issuer
        if (serviceIssuer !== 'wiki') {
          return manager.deauthorize(serviceIssuer)
            .then(() => console.log(`${serviceIssuer} 로그아웃!`))
            .catch(err => console.log(`${serviceIssuer} 로그아웃 에러 발생!`, err));
        }
      })
      .then(() => {
        return removeSecretData()
          .then(() => {
            fetch('https://mail.google.com/mail/u/0/?logout&hl=en')
            .then(() => Actions.logIn({ type: 'reset' }));
          });
      });
    });
  };
}

export function checkSavedAccounts() {
  return (dispatch) => {
    dispatch(loading());

    return manager.savedAccounts()
      .then(res => res.accounts);
  };
}
