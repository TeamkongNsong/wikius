import React, { Component } from 'react';
import {
 View,
 Button,
 Text,
 AsyncStorage,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { host, key } from '../../../../../configure';
import UserProfileImg from './userProfileImg';
import UserProfileNickname from './userProfileNickname';
import UserProfileStateMessage from './userProfileStateMessage';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      isMine: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem(key)
    .then(data => JSON.parse(data))
    .then((parsedData) => {
      fetch(`${host}/users/me`, {
        method: 'GET',
        headers: parsedData.headers,
      })
      .then(user => JSON.parse(user._bodyText).user)
      .then((parsedUser) => {
        this.setState({
          isMine: parsedUser.idx === this.props.userInProfile.idx,
        });
      })
    });
  }

  render() {
    return (
      <View style={{ backgroundColor: 'rgba(0, 100, 0, 1)', flexDirection: 'row' }}>
        <UserProfileImg userImage={this.props.userInProfile.image} />
        <View>
          <UserProfileNickname userNickname={this.props.userInProfile.nickname} />
          <UserProfileStateMessage userStateMessage={this.props.userInProfile.stateMessage} />
        </View>
        {
          this.state.isMine && !this.props.isNotMine
          ? <Button title="setting" onPress={Actions.profileSetting} />
          : <Text />
        }
      </View>
    );
  }
}

export default UserProfile;
