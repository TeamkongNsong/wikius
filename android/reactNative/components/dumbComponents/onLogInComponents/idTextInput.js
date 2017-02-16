import React, { Component } from 'react';
import { TextInput } from 'react-native';

import { textInputStyle } from '../../../../../configure';

class IdTextInput extends Component {
  render() {
    return (
      <TextInput
        style={textInputStyle}
        placeholder="ID"
        onChangeText={this.props.changeIdOnTextInput}
      />
    );
  }
}

export default IdTextInput;
