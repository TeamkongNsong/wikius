import React, { Component } from 'react';
import { TextInput } from 'react-native';

import { textInputStyle } from '../../../../../configure';

class MakePassword2TextInput extends Component {
  render() {
    return (
      <TextInput
        style={textInputStyle}
        placeholder="비밀번호를 한번 더 입력해주세요."
        onChangeText={(password2) => {
          this.props.inputPassword2(password2);
          this.props.checkProperPassword();
        }}
        secureTextEntry
      />
    );
  }
}

export default MakePassword2TextInput;
