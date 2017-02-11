import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Button,
  TextInput,
  Text,
  BackAndroid,
  Dimensions,
} from 'react-native';

import * as nicknameActions from '../actions/nicknameActions';

const propTypes = {
  inputNickname: React.PropTypes.func,
  checkNick: React.PropTypes.string,
  check: React.PropTypes.bool,
  confirm: React.PropTypes.func,
};

const defaultProps = {

};

class MakeNickname extends Component {
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => true);
    this.windowSize = Dimensions.get('window');
  }

  confirmButton(check) {
    return check
      ? <Text />
      : (
        <View style={{ top: (this.windowSize.height / 2) - 110, left: 130 }}>
          <Button
            title="확인"
            onPress={this.props.confirm}
            color="#841584"
          />
        </View>
      );
  }

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <TextInput
          style={{ top: (this.windowSize.height / 2) - 60, width: 200, textAlign: 'center' }}
          placeholder="닉네임을 입력해주세요."
          onChangeText={this.props.inputNickname}
        />
        <Text style={{ top: 250 }}>
          {this.props.checkNick}
        </Text>
        {this.confirmButton(this.props.check)}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  checkNick: state.nicknameManager.checkNick,
  check: state.nicknameManager.check,
});

const mapDispatchToProps = dispatch => ({
  inputNickname: nickname => dispatch(nicknameActions.inputNickname(nickname)),
  confirm: () => dispatch(nicknameActions.confirm()),
});

MakeNickname = connect(mapStateToProps, mapDispatchToProps)(MakeNickname);

MakeNickname.propTypes = propTypes;
MakeNickname.defaultProps = defaultProps;

export default MakeNickname;
