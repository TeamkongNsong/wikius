import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
 View,
 TextInput,
 Text,
 AsyncStorage,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { centerCenterStyle, host, key } from '../../../../configure';
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
    return AsyncStorage.getItem(key)
    .then(data => JSON.parse(data))
    .then((parsedData) => {
      return fetch(`${host}/users/me/state_message`, {
        method: 'PUT',
        headers: parsedData.headers,
        body: JSON.stringify({
          state_message: message,
        }),
      })
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

});

const mapDispatchToProps = dispatch => ({

});

ChangeStateMsg = connect(mapStateToProps, mapDispatchToProps)(ChangeStateMsg);

export default ChangeStateMsg;
