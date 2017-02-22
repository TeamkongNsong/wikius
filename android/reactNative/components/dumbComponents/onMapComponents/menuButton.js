import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

const styles = {
  fontSize: 20,
  height: 22,
  color: 'white',
};

class MenuButton extends Component {
  render() {
    return (
      <ActionButton buttonColor="rgba(0, 0, 200, 0.5)" offsetX={15} offsetY={0}>
        {/* 프로필 */}
        <ActionButton.Item
          buttonColor="rgba(0, 200, 0, 0.5)"
          onPress={() => {
            /* 프로필로 이동하는 코드 */
            this.props.getMyData()
            .then((data) => {
              const userInProfile = {
                idx: data.idx,
                nickname: data.nickname,
                image: data.img,
                stateMessage: data.state_message,
              };

              this.props.getTimelineOfUser(userInProfile.idx)
              .then(() => {
                this.props.refreshProfile(userInProfile);
                Actions.profiles({ isMine: true, isFriendStatus: 100, friendFromMe: false });
              });
            });
          }}
          offsetX={29}
        >
          <Icon name="md-person" style={styles} />
        </ActionButton.Item>

        {/* 유저 검색 */}
        <ActionButton.Item
          buttonColor="rgba(0, 200, 0, 0.5)"
          onPress={Actions.searchUser}
          offsetX={29}
        >
          <Icon name="md-search" style={styles} />
        </ActionButton.Item>

        {/* 친구 목록 */}
        <ActionButton.Item
          buttonColor="rgba(0, 200, 0, 0.5)"
          onPress={Actions.friendsList}
          offsetX={29}
        >
          <Icon name="md-people" style={styles} />
        </ActionButton.Item>

        {/* 로그아웃 */}
        <ActionButton.Item
          buttonColor="rgba(0, 200, 0, 0.5)"
          onPress={this.props.logOut}
          offsetX={29}
        >
          <Icon name="md-log-out" style={styles} />
        </ActionButton.Item>
      </ActionButton>
    );
  }
}

export default MenuButton;
