import React, { Component } from 'react';
import { View, Text } from 'react-native';

import UserProfile from '../../dumbComponents/profiles/userProfile';

class Friends extends Component {
  friendsDataToProfile(friends) {
    if (friends.length === 0) {
      return (
        <Text style={{ textAlign: 'center' }}>친구가 없습니다.</Text>
      );
    }
    return friends.map((friend, index) => (
      <UserProfile
        key={`FriendProfiles${index * 10}`}
        userInProfile={{
          image: friend.img,
          nickname: friend.nickname,
          stateMessage: friend.state_message,
        }}
      />
    ));
  }

  render() {
    return (
      <View>
        {this.friendsDataToProfile(this.props.friends)}
      </View>
    );
  }
}

export default Friends;
