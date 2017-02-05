import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Button,
  TextInput,
  Text,
  BackAndroid,
} from 'react-native';

import * as nicknameActions from '../actions/nicknameActions';

const Dimensions = require('Dimensions');

class MakeNickname extends Component {
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => true);
    this.setState({
      center: Dimensions.get('window').height / 2,
    });
  }

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <TextInput
          ref={(input) => { this.nickInput = input; }}
          style={{ top: this.state.center - 60, width: 200, textAlign: 'center' }}
          placeholder="닉네임을 입력해주세요."
          onChangeText={this.props.inputNickname}
        />
        <Text style={{ top: 250 }}>
          {this.props.checkNick}
        </Text>
        <View
          ref={(view) => { this.checkButton = view; }}
          style={{
            top: this.state.center - 110,
            left: 130,
            opacity: this.props.checkButtonOpacity
          }}
        >
          <Button
            title="확인"
            onPress={this.props.confirm}
            color="#841584"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  host: state.nicknameManager.host,
  checkNick: state.nicknameManager.checkNick,
  checkButtonOpacity: state.nicknameManager.checkButtonOpacity,
});

const mapDispatchToProps = dispatch => ({
  inputNickname: nickname => dispatch(nicknameActions.inputNickname(nickname)),
  confirm: () => dispatch(nicknameActions.confirm()),
});

MakeNickname = connect(mapStateToProps, mapDispatchToProps)(MakeNickname);

export default MakeNickname;
