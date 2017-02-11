import React, { Component } from 'react';
import {
 View,
} from 'react-native';

import UserProfileImg from './userProfileImg';
import UserProfileNickname from './userProfileNickname';
import UserProfileStateMessage from './userProfileStateMessage';

class UserProfile extends Component {
  render() {
    return (
    <View style={{
      backgroundColor: 'rgba(0, 100, 0, 1)',
      flexDirection: 'row',
     }}>
      <UserProfileImg userImage={this.props.userInProfile.image} />
      <View>
        <UserProfileNickname
        userNickname={this.props.userInProfile.nickname} />

        <UserProfileStateMessage userStateMessage={this.props.userInProfile.stateMessage} />
      </View>
    </View>
    );
  }
}

export default UserProfile;
