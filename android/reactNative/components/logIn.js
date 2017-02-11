import React, { Component } from 'react';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  View,
  Button,
} from 'react-native';

import * as loginActions from '../actions/loginActions';
import * as nicknameActions from '../actions/nicknameActions';

const propTypes = {
  host: React.PropTypes.string,
  refreshNickname: React.PropTypes.func,
  onLogIn: React.PropTypes.func,
  onLogOut: React.PropTypes.func,
};

const defaultProps = {
  host: null,
  refreshNickname: null,
  onLogIn: null,
  onLogOut: null,
};

class LogIn extends Component {
  componentDidMount() {
    this.configure();
  }

  configure() {
    GoogleSignin.configure({})
    .then(() => {
      GoogleSignin.currentUserAsync().then((user) => {
        if (user !== null) {
          fetch(`${this.props.host}/users/${user.id}`)
          .then((thisUser) => {
            if (thisUser._bodyText === '') {
              return Actions.makeNickname();
            }
            const parsedUser = JSON.parse(thisUser._bodyText);
            this.props.refreshNickname(parsedUser.nickname);
            return parsedUser;
          })
          .then((parsedUser) => {
            if (parsedUser) {
              this.props.onLogIn();
            }
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
  nickname: state.nicknameManager.nickname,
});

const mapDispatchToProps = dispatch => ({
  onLogIn: () => dispatch(loginActions.logIn()),
  onLogOut: () => dispatch(loginActions.logOut()),
  refreshNickname: nickname => dispatch(nicknameActions.refreshNickname(nickname)),
});

LogIn = connect(mapStateToProps, mapDispatchToProps)(LogIn);

LogIn.propTypes = propTypes;
LogIn.defaultProps = defaultProps;

export default LogIn;
