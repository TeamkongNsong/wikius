import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { centerCenterStyle } from '../../../../configure';
import * as registerActions from '../../actions/registerActions';
import MakeIdTextInput from '../dumbComponents/onRegisterComponents/makeIdTextInput';
import ConfirmButton from '../dumbComponents/onRegisterComponents/confirmButton';
import BackButton from '../dumbComponents/onRegisterComponents/backButton';

class MakeId extends Component {
  render() {
    return (
      <View style={centerCenterStyle}>
        <MakeIdTextInput inputId={this.props.inputId} />
        <Text>{this.props.checkDuplicatedId}</Text>
        <ConfirmButton check={!this.props.check} callback={Actions.makePassword} />
        <BackButton />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  scene: state.routes.scene,
  checkDuplicatedId: state.registerManager.checkDuplicatedId,
  check: state.registerManager.check,
});

const mapDispatchToProps = dispatch => ({
  inputId: id => dispatch(registerActions.inputId(id)),
});

MakeId = connect(mapStateToProps, mapDispatchToProps)(MakeId);

export default MakeId;
