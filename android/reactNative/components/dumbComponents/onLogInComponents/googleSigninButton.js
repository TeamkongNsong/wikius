import React, { Component } from 'react';
import { View, Button } from 'react-native';

class GoogleSigninButton extends Component {
  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <Button
          title="google login"
          onPress={() => {
            this.props.logIn('google');
          }}
        />
      </View>
    );
  }
}

export default GoogleSigninButton;
