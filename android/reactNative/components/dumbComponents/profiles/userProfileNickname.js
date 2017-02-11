import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import {
 View,
 Text,
 StyleSheet,
 Button,
} from 'react-native';

const styles = StyleSheet.create({
  nickname: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  setting: {
    color: '#841584',
  },
});

class UserProfileNickname extends Component {
  render() {
    return (
      <View>
        <Text style={[styles.nickname]}>
        {this.props.userNickname}
        </Text>
        <Button
          style={[styles.setting]}
          onPress={() => {
            Actions.profileSetting();
          }}
          title="setting"
        />
      </View>
    );
  }
}

export default UserProfileNickname;
