import React, { Component } from 'react';
import {
 View,
 Text,
} from 'react-native';

import UserProfileImg from './userProfileImg';
import UserProfileNickname from './userProfileNickname';
import UserProfileStateMessage from './userProfileStateMessage';

class UserProfile extends Component {
  render() {
    return (
    <View style={{ height: 100, backgroundColor: 'rgba(0, 100, 150, 1)' }}>
      <Text>users profile</Text>
      <UserProfileImg userImage={this.props.userInProfile.image} />
      <UserProfileNickname userNickname={this.props.userInProfile.nickname} />
      <UserProfileStateMessage userStateMessage={this.props.userInProfile.stateMessage} />
    </View>
    );
  }
}

export default UserProfile;
