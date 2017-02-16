import React, { Component } from 'react';
import { TextInput } from 'react-native';

import { textInputStyle } from '../../../../../configure';

class PasswordTextInput extends Component {
  render() {
    return (
      <TextInput
        style={textInputStyle}
        placeholder="비밀번호"
        onChangeText={this.props.changePasswordOnTextInput}
        secureTextEntry
      />
    );
  }
}

export default PasswordTextInput;
