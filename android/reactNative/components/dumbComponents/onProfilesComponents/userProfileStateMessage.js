import React, { Component } from 'react';
import { View, Text } from 'react-native';

class UserProfileStateMessage extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.userStateMessage}</Text>
      </View>
    );
  }
}

export default UserProfileStateMessage;
