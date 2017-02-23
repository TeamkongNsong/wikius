import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
        <Text style={[styles.nickname]}>{this.props.userNickname}</Text>
      </View>
    );
  }
}

export default UserProfileNickname;
