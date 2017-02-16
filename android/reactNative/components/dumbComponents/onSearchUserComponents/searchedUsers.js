import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import UserProfile from '../../dumbComponents/profiles/userProfile';

class SearchedUsers extends Component {
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
        stateMessage: user.state_message || '상태메시지를 입력해주세요',
      };

      return (
        <TouchableOpacity
          key={`UserProfiles${index * 10}`}
          onPress={() => {
            this.props.refreshProfile(userInProfile);
            Actions.profiles();
          }}
        >
          <UserProfile
            userInProfile={userInProfile}
            isNotMine
          />
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
