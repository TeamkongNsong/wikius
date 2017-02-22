import React, { Component } from 'react';
import { View, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { host, key } from '../../../../../configure';
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

      let parsedData = '';

      AsyncStorage.getItem(key)
      .then((data) => {
        parsedData = JSON.parse(data);
        return fetch(`${host}/users/${friend}`, {
          method: 'GET',
          headers: parsedData.headers,
        })
        .then((friendData) => {
          const parsedFriendData = JSON.parse(friendData._bodyText).user;
          userInProfile.image = parsedFriendData.img;
          userInProfile.nickname = parsedFriendData.nickname;
          userInProfile.stateMessage = parsedFriendData.state_message;

          const result = [...this.state.friends];

          result.push(
            <TouchableOpacity
              key={`FriendProfiles${index * 10}`}
              onPress={() => {
                /* 프로필로 이동하는 코드 */
                fetch(`${host}/friends/me/${userInProfile.nickname}`, {
                  method: 'GET',
                  headers: parsedData.headers,
                })
                .then((friendsInfo) => {
                  fetch(`${host}/users/me`, {
                    method: 'GET',
                    headers: parsedData.headers,
                  })
                  .then((myUserData) => {
                    const parsedMyUser = JSON.parse(myUserData._bodyText).user;
                    const parsedFriendsInfo = JSON.parse(friendsInfo._bodyText).friendsInfo[0];
                    const isFriendStatus = parsedFriendsInfo.status;
                    const friendFromMe = parsedFriendsInfo.from === parsedMyUser.idx;
                    this.props.getTimelineOfUser(userInProfile.idx)
                    .then(() => {
                      this.props.refreshProfile(userInProfile);
                      Actions.profiles({ isMine: false, isFriendStatus, friendFromMe });
                    });
                  });
                });
              }}
            >
              <UserProfile userInProfile={userInProfile} isNotMine />
            </TouchableOpacity>
          );
          this.setState({
            friends: result,
          });
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
