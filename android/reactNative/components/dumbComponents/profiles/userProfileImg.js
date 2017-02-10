import React, { Component } from 'react';
import {
 View,
 Text,
} from 'react-native';

class UserProfileImg extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.userImage}</Text>
      </View>
    );
  }
}

export default UserProfileImg;
