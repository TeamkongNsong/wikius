import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { centerCenterStyle } from '../../../../configure';
import * as loginActions from '../../actions/loginActions';
import IdTextInput from '../dumbComponents/onLogInComponents/idTextInput';
import PasswordTextInput from '../dumbComponents/onLogInComponents/passwordTextInput';
import WikiusLogInButton from '../dumbComponents/onLogInComponents/wikiusLogInButton';
import RegisterButton from '../dumbComponents/onLogInComponents/registerButton';
import GoogleSigninButton from '../dumbComponents/onLogInComponents/googleSigninButton';

class LogIn extends Component {
  componentDidMount() {
    this.props.checkSavedAccounts()
    .then((accounts) => {
      if (accounts.length > 0) {
        this.props.logIn('google');
      }
    });
  }

  render() {
    return (
      <View style={centerCenterStyle}>
        <IdTextInput changeIdOnTextInput={this.props.changeIdOnTextInput} />
        <PasswordTextInput changePasswordOnTextInput={this.props.changePasswordOnTextInput} />

        <View style={{ marginTop: 50, flexDirection: 'row' }}>
          <WikiusLogInButton
            logIn={this.props.logIn}
            idOnTextInput={this.props.idOnTextInput}
            passwordOnTextInput={this.props.passwordOnTextInput}
          />
          <RegisterButton />
        </View>
        <GoogleSigninButton logIn={this.props.logIn} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  scene: state.routes.scene,
  idOnTextInput: state.logInManager.idOnTextInput,
  passwordOnTextInput: state.logInManager.passwordOnTextInput,
});

const mapDispatchToProps = dispatch => ({
  changeIdOnTextInput: id => dispatch(loginActions.changeIdOnTextInput(id)),
  changePasswordOnTextInput: password => dispatch(loginActions.changePasswordOnTextInput(password)),
  logIn: (serviceIssuer, id, password) => dispatch(loginActions.logIn(serviceIssuer, id, password)),
  checkSavedAccounts: () => dispatch(loginActions.checkSavedAccounts()),
});

LogIn = connect(mapStateToProps, mapDispatchToProps)(LogIn);

export default LogIn;
