import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import UserProfile from '../../dumbComponents/onProfilesComponents/userProfile';

class Friends extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      blocked: [],
      request: [],
      receive: [],
    };
  }

  componentDidMount() {
    this.props.fetchFriends()
    .then(() => {
      this.friendsDataToProfile(this.props.friends);
    });
  }

  friendsDataToProfile(friends) {
    if (friends.length === 0) {
      return this.setState({
        friends: (
          <Text style={{ textAlign: 'center' }}>친구가 없습니다.</Text>
        ),
      });
    }
    return friends.forEach((friend, index) => {
      const userInProfile = {
        idx: friend,
      };

      this.props.fetchWithHeaders(`users/${friend}`, 'GET')
      .then((friendData) => {
        const parsedFriendData = JSON.parse(friendData._bodyText).user;
        userInProfile.image = parsedFriendData.img;
        userInProfile.nickname = parsedFriendData.nickname;
        userInProfile.stateMessage = parsedFriendData.state_message;

        const result = [...this.state.friends];

        result.push(
          <TouchableOpacity key={`FriendProfiles${index * 10}`} onPress={() => this.props.moveToProfiles(userInProfile)}>
            <UserProfile userInProfile={userInProfile} isNotMine />
          </TouchableOpacity>
        );
        this.setState({
          friends: result,
        });
      });
    });
  }

  render() {
    return (
      <View>
        {this.state.friends}
      </View>
    );
  }
}

export default Friends;
