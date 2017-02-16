import React, { Component } from 'react';
import { View, Button } from 'react-native';

class WikiusLogInButton extends Component {
  render() {
    return (
      <View style={{ flex: 1, paddingLeft: 90, marginRight: 20 }}>
        <Button
          title="로그인"
          onPress={() => {
            this.props.logIn('wiki', this.props.idOnTextInput, this.props.passwordOnTextInput);
          }}
        />
      </View>
    );
  }
}

export default WikiusLogInButton;
