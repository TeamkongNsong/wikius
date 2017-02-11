import React, { Component } from 'react';
import {
 View,
 Text,
 Image,
} from 'react-native';

const defaultUserImg = require('../../../resource/image/user_default.png');
const defaultuserImge2 = 'https://scontent.cdninstagram.com/hphotos-xtf1/t51.2885-15/e15/11142978_1405486889773199_1926200356_n.jpg';

class UserProfileImg extends Component {
  render() {
    return (
      <View>
      <Image
        style={{
          width: 80, height: 80,
          borderRadius: 100,
          borderWidth: 0.1,
          borderColor: '#d6d7da',
        }}
        source={{ uri: defaultuserImge2 }}
      />
      </View>
    );
  }
}

export default UserProfileImg;
