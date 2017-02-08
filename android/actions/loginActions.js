import { GoogleSignin } from 'react-native-google-signin';
import { Actions } from 'react-native-router-flux';

import * as types from './actionTypes';

const loading = () => ({
  type: types.LOADING,
});

const refreshUser = user => ({
  type: types.REFRESH_USER,
  user,
});

export function logIn() {
  return (dispatch, getState) => {
    dispatch(loading());
    const {
      host,
      user,
    } = getState().logInManager;

    if (user !== null) return console.log('already logged in!');

    return GoogleSignin.hasPlayServices({ autoResolve: true })
      .then(() => {
        GoogleSignin.signIn()
          .then((signedUser) => {
            console.log(`logged in : ${signedUser.name}`);
            dispatch(refreshUser(signedUser));
            return signedUser;
          })
          .catch((err) => {
            console.log('WRONG SIGNIN', err);
          })
          .then((matchNeedUser) => {
            fetch(`${host}/users/matchuser_id/${matchNeedUser.id}`)
            .then((res) => {
              const check = JSON.parse(res._bodyText);
              if (check) {
                Actions.main();
              } else {
                Actions.makeNickname();
              }
            });
          });
      })
      .catch((err) => {
        console.log('Play services error', err.code, err.message);
      });
  };
}

export function logOut() {
  return (dispatch, getState) => {
    dispatch(loading());
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
