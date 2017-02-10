import React, { Component } from 'react';
import {
 View,
 Text,
} from 'react-native';

class UserProfileNickname extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.userNickname}</Text>
      </View>
    );
  }
}

export default UserProfileNickname;
