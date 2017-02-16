import React, { Component } from 'react';
import { TextInput } from 'react-native';

import { textInputStyle } from '../../../../../configure';

class MakeIdTextInput extends Component {
  render() {
    return (
      <TextInput
        style={textInputStyle}
        placeholder="ID를 입력해주세요."
        onChangeText={this.props.inputId}
      />
    );
  }
}

export default MakeIdTextInput;
