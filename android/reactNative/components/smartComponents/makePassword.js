import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import * as registerActions from '../../actions/registerActions';
import { centerCenterStyle } from '../../../../configure';
import MakePasswordTextInput from '../dumbComponents/onRegisterComponents/makePasswordTextInput';
import MakePassword2TextInput from '../dumbComponents/onRegisterComponents/makePassword2TextInput';
import ConfirmButton from '../dumbComponents/onRegisterComponents/confirmButton';
import BackButton from '../dumbComponents/onRegisterComponents/backButton';

class MakePassword extends Component {
  render() {
    return (
      <View style={centerCenterStyle}>
        <MakePasswordTextInput
          inputPassword={this.props.inputPassword}
          checkProperPassword={this.props.checkProperPassword}
        />
        <MakePassword2TextInput
          inputPassword2={this.props.inputPassword2}
          checkProperPassword={this.props.checkProperPassword}
        />
        <Text>{this.props.checkProperPasswordText}</Text>
        <ConfirmButton
          check={this.props.isProperPassword}
          callback={this.props.registerConfirm}
        />
        <BackButton />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  checkProperPasswordText: state.registerManager.checkProperPasswordText,
  isProperPassword: state.registerManager.isProperPassword,
});

const mapDispatchToProps = dispatch => ({
  inputPassword: password => dispatch(registerActions.inputPassword(password)),
  inputPassword2: password2 => dispatch(registerActions.inputPassword2(password2)),
  checkProperPassword: () => dispatch(registerActions.checkProperPassword()),
  registerConfirm: () => dispatch(registerActions.registerConfirm()),
});

MakePassword = connect(mapStateToProps, mapDispatchToProps)(MakePassword);

export default MakePassword;
