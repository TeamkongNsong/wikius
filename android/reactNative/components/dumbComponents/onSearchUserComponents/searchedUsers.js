import React, { Component } from 'react';
import { View, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { host, key } from '../../../../../configure';
import UserProfile from '../../dumbComponents/onProfilesComponents/userProfile';

class SearchedUsers extends Component {
  componentDidMount() {
    this.props.fetchSearch('');
  }

  userDataToProfile(searchResult) {
    if (searchResult.length === 0) {
      return (
        <Text style={{ textAlign: 'center' }}>검색된 유저가 없습니다.</Text>
      );
    }

    return searchResult.map((user, index) => {
      const userInProfile = {
        idx: user.idx,
        image: user.img,
        nickname: user.nickname,
        stateMessage: user.state_message,
      };

      return (
        <TouchableOpacity
          key={`UserProfiles${index * 10}`}
          onPress={() => {
            /* 프로필로 이동하는 코드 */
            AsyncStorage.getItem(key)
            .then((data) => {
              const parsedData = JSON.parse(data);
              fetch(`${host}/users/me`, {
                method: 'GET',
                headers: parsedData.headers,
              })
              .then((myUserData) => {
                const parsedMyUser = JSON.parse(myUserData._bodyText).user;
                const isMine = parsedMyUser.idx === userInProfile.idx;

                fetch(`${host}/friends/me/${userInProfile.nickname}`, {
                  method: 'GET',
                  headers: parsedData.headers,
                })
                .then((friendsInfo) => {
                  const parsedFriendsInfo = JSON.parse(friendsInfo._bodyText).friendsInfo[0];
                  const isFriendStatus = isMine
                    ? 100
                    : (parsedFriendsInfo ? parsedFriendsInfo.status : 10);
                  const friendFromMe = parsedFriendsInfo
                    ? parsedFriendsInfo.from === parsedMyUser.idx
                    : false;
                    
                  this.props.getTimelineOfUser(userInProfile.idx)
                  .then(() => {
                    this.props.refreshProfile(userInProfile);
                    Actions.profiles({ isMine, isFriendStatus, friendFromMe });
                  });
                });
              });
            });
          }}
        >
          <UserProfile userInProfile={userInProfile} isNotMine />
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <View>
        {this.userDataToProfile(this.props.searchResult)}
      </View>
    );
  }
}

export default SearchedUsers;
