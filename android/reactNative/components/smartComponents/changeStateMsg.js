import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import * as loginActions from '../../actions/loginActions';
import { centerCenterStyle } from '../../../../configure';
import ConfirmButton from '../dumbComponents/onRegisterComponents/confirmButton';
import BackButton from '../dumbComponents/onRegisterComponents/backButton';

class ChangeStateMsg extends Component {
  constructor() {
    super();
    this.message = null;
    this.state = {
      stateMsgLength: 0,
    };
  }

  updateStateMessage(message) {
    return this.props.fetchWithHeaders('users/me/state_message', 'PUT', {
      state_message: message,
    });
  }

  render() {
    return (
      <View style={centerCenterStyle}>
        <TextInput
          style={{ width: 200, textAlign: 'center' }}
          placeholder="상태 메시지를 입력해주세요."
          maxLength={60}
          onChangeText={(stateMsg) => {
            this.message = stateMsg;
            this.setState({
              stateMsgLength: stateMsg.length,
            });
          }}
        />
        <Text style={{ textAlign: 'center' }}>
          {this.state.stateMsgLength}/60
        </Text>
        <ConfirmButton
          check
          callback={() => {
            this.updateStateMessage(this.message)
            .then(Actions.pop);
          }}
        />
        <BackButton />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  scene: state.routes.scene,
});

const mapDispatchToProps = dispatch => ({
  fetchWithHeaders: (url, method, body) =>
    dispatch(loginActions.fetchWithHeaders(url, method, body)),
});

ChangeStateMsg = connect(mapStateToProps, mapDispatchToProps)(ChangeStateMsg);

export default ChangeStateMsg;
