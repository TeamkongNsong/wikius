import React, { Component } from 'react';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { connect } from 'react-redux';
import {
  View,
  Button,
} from 'react-native';

import * as loginActions from '../actions/loginActions';
import * as nicknameActions from '../actions/nicknameActions';

class LogIn extends Component {
  componentDidMount() {
    this.configure();
  }

  configure() {
    GoogleSignin.configure({
    })
    .then(() => {
      GoogleSignin.currentUserAsync().then((user) => {
        if (user !== null) {
          fetch(`${this.props.host}/users/${user.id}`)
          .then((thisUser) => {
            this.props.refreshNickname(JSON.parse(thisUser._bodyText).nickname);
          })
          .then(() => {
            this.props.onLogIn();
          });
        }
      }).done();
    });
  }

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <View>
          <GoogleSigninButton
            style={{ width: 312, height: 48, top: 250 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this.props.onLogIn}
          />
        </View>

        <Button
          onPress={this.props.onLogOut}
          title="SIGN OUT"
          color="#841584"
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.logInManager.user,
  host: state.logInManager.host,
});

const mapDispatchToProps = dispatch => ({
  onLogIn: () => dispatch(loginActions.logIn()),
  onLogOut: () => dispatch(loginActions.logOut()),
  refreshNickname: nickname => dispatch(nicknameActions.refreshNickname(nickname)),
});

LogIn = connect(mapStateToProps, mapDispatchToProps)(LogIn);

export default LogIn;
