import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';
import { connect } from 'react-redux';

import { centerCenterStyle, textInputStyle } from '../../../../configure';
import * as nicknameActions from '../../actions/nicknameActions';
import ConfirmButton from '../dumbComponents/onRegisterComponents/confirmButton';
import BackButton from '../dumbComponents/onRegisterComponents/backButton';

class MakeNickname extends Component {
  render() {
    return (
      <View style={centerCenterStyle}>
        <TextInput
          style={textInputStyle}
          placeholder="닉네임을 입력해주세요."
          onChangeText={this.props.inputNickname}
        />
        <Text>{this.props.checkDuplicatedNick}</Text>
        <ConfirmButton check={!this.props.check} callback={this.props.confirm} />
        <BackButton />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  scene: state.routes.scene,
  checkDuplicatedNick: state.nicknameManager.checkDuplicatedNick,
  check: state.nicknameManager.check,
});

const mapDispatchToProps = dispatch => ({
  inputNickname: nickname => dispatch(nicknameActions.inputNickname(nickname)),
  confirm: refreshProfile => dispatch(nicknameActions.confirm(refreshProfile)),
});

MakeNickname = connect(mapStateToProps, mapDispatchToProps)(MakeNickname);

export default MakeNickname;
