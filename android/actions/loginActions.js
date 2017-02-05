import { GoogleSignin } from 'react-native-google-signin';
import { Actions } from 'react-native-router-flux';

import * as types from './actionTypes';

const requestLogIn = () => ({
  type: types.REQUEST_LOGIN,
});

const requestLogOut = () => ({
  type: types.REQUEST_LOGOUT,
});

const refreshUser = user => ({
  type: types.REFRESH_USER,
  user,
});

export function logIn() {
  return (dispatch, getState) => {
    dispatch(requestLogIn());
    const {
      host,
      user,
    } = getState().logInManager;

    if (user !== null) return;

    return GoogleSignin.hasPlayServices({ autoResolve: true })
    .then(() => GoogleSignin.signIn()
      .then((user) => {
        console.log(`logged in : ${user.name}`);
        dispatch(refreshUser(user));
        return user;
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      }))
    .catch((err) => {
      console.log('Play services error', err.code, err.message);
    })
    .then(user =>
      fetch(`${host}/users/matchuser_id/${user.id}`)
      .then((res) => {
        const check = JSON.parse(res._bodyText);
        if (check) {
          Actions.main();
        } else {
          Actions.makeNickname();
        }
      })
    );
  };
}

export function logOut() {
  return (dispatch, getState) => {
    dispatch(requestLogOut());
    const { user } = getState().logInManager;

    if (user === null) return;

    return GoogleSignin.signOut()
    .then(() => {
      dispatch(refreshUser(null));
      console.log('out');
    })
    .catch((err) => {
      console.log(err);
    });
  };
}
