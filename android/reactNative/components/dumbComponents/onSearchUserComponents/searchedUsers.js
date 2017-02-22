import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

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
        <TouchableOpacity key={`UserProfiles${index * 10}`} onPress={() => this.props.moveToProfiles(userInProfile)}>
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
