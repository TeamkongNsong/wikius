import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

class RegisterButton extends Component {
  render() {
    return (
      <View style={{ flex: 1, marginLeft: 20, paddingRight: 90 }}>
        <Button title="회원가입" onPress={Actions.makeId} />
      </View>
    );
  }
}

export default RegisterButton;
