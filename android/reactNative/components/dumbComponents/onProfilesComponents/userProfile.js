import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import UserProfileImg from './userProfileImg';
import UserProfileNickname from './userProfileNickname';
import UserProfileStateMessage from './userProfileStateMessage';

class UserProfile extends Component {
  responseButton() {
    return (
      <View>
        <Button
          title="수락"
          onPress={() => {
            this.props.fetchWithHeaders('friends/me', 'PUT', {
              friend: this.props.userInProfile.nickname,
              status: 1,
            })
            .then(() => Actions.refresh({ isFriendStatus: 1 }));
          }}
        />
        <Button
          title="거부"
          onPress={() => {
            this.props.fetchWithHeaders('friends/me', 'DELETE', {
              friend: this.props.userInProfile.nickname,
            })
            .then(() => Actions.refresh({ isFriendStatus: 10 }));
          }}
        />
      </View>
    );
  }

  addFriendButton(isFriendStatus) {
    switch (isFriendStatus) {
      case 1:
        return (<Text>친구</Text>);
      case 0: {
        if (this.props.friendFromMe) {
          return (
            <View>
              <Text>친구요청 보냄</Text>
              <Button
                title="친구요청 취소"
                onPress={() => {
                  this.props.cancelAddFriend(this.props.userInProfile.nickname);
                  Actions.refresh({ isFriendStatus: 10 });
                }}
              />
            </View>
          );
        }
        return this.responseButton();
      }
      case -1:
        return (<Text>차단된 유저</Text>);
      case 10:
        return (
          <Button
            title="친추"
            onPress={() => {
              this.props.addFriend(this.props.userInProfile.nickname);
              Actions.refresh({ isFriendStatus: 0, friendFromMe: true });
            }}
          />
        );
      case 100:
        return (<Text />);
      default:
        return (<Text />);
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: 'rgba(200, 200, 200, 1)', flexDirection: 'row' }}>
        <UserProfileImg
          userInProfile={this.props.userInProfile}
          isMine={this.props.isMine}
          fetchWithHeaders={this.props.fetchWithHeaders}
        />
        <View>
          <UserProfileNickname userNickname={this.props.userInProfile.nickname} />
          <UserProfileStateMessage userStateMessage={this.props.userInProfile.stateMessage} />
        </View>
        {this.props.isMine ? <Button title="setting" onPress={Actions.profileSetting} /> : <Text />}
        {this.addFriendButton(this.props.isFriendStatus)}
      </View>
    );
  }
}

export default UserProfile;
