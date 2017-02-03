/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';


export default class wikius extends Component {
  constructor() {
    super();

    this.state = {
      user : null,
    };
  }

  _currentUserAsync() {
    GoogleSignin.currentUserAsync().then((user) => {
      this.setState({ user });
    }).done();
  }

  _configure() {
    GoogleSignin.configure({
    })
    .then(() => {
      this._currentUserAsync();
    });
  }

  _signIn() {
    GoogleSignin.hasPlayServices({ autoResolve: true })
    .then(() => {
      if (this.state.user === null) {
        GoogleSignin.signIn()
        .then((user) => {
          this._currentUserAsync();
          console.log(user);
        })
        .catch((err) => {
          console.log('WRONG SIGNIN');
        })
        .done();
      }
    })
    .catch((err) => {
      console.log("Play services error", err.code, err.message);
    });
  }

  _signOut() {
    if (this.state.user !== null) {
      GoogleSignin.signOut()
      .then(() => {
        this.setState({ user: null });
      })
      .catch((err) => {
        console.log('err');
      });
    }
  }

  componentDidMount() {
    this._configure();
  }

  render() {
    return (
      <View>
        <GoogleSigninButton
          style={{width: 312, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signIn.bind(this)}/>
        <Button
          onPress={this._signOut.bind(this)}
          title="SIGN OUT"
          color="#841584"/>
        <Text>
          {JSON.stringify(this.state.user)}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('wikius', () => wikius);
