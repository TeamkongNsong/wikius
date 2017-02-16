import React, { Component } from 'react';
import { TextInput } from 'react-native';

import { textInputStyle } from '../../../../../configure';

class MakePasswordTextInput extends Component {
  render() {
    return (
      <TextInput
        style={textInputStyle}
        placeholder="비밀번호를 입력해주세요."
        onChangeText={(password) => {
          this.props.inputPassword(password);
          this.props.checkProperPassword();
        }}
        secureTextEntry
      />
    );
  }
}

export default MakePasswordTextInput;
