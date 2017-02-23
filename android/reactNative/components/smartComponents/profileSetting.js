import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import BackButton from '../dumbComponents/onRegisterComponents/backButton';
import * as loginActions from '../../actions/loginActions';
import * as profilesActions from '../../actions/profilesActions';
import { centerCenterStyle } from '../../../../configure';

const styles = StyleSheet.create({
  nickname: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  stateMsg: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  direction: {
    flexDirection: 'column',
  },
  setting: {
    color: '#841584',
  },
});

class ProfileSetting extends Component {
 render() {
   return (
    <View style={centerCenterStyle}>
      <View>
        <Button
          style={[styles.nickname]}
          onPress={Actions.makeNickname}
          title="change nickname"
        />
      </View>
      <View>
        <Button
          style={[styles.stateMsg]}
          onPress={Actions.changeStateMsg}
          title="change State Message"
        />
      </View>
      <BackButton
        callback={() => {
          this.props.getMyData()
          .then((data) => {
            const userInProfile = {
              idx: data.idx,
              nickname: data.nickname,
              image: data.img,
              stateMessage: data.state_message,
            };

            this.props.moveToProfiles(userInProfile);
          });
        }}
      />
    </View>
   );
 }
}

const mapStateToProps = state => ({
  scene: state.routes.scene,
});

const mapDispatchToProps = dispatch => ({
  getMyData: () => dispatch(loginActions.getMyData()),
  moveToProfiles: userInProfile => dispatch(profilesActions.moveToProfiles(userInProfile)),
});

ProfileSetting = connect(mapStateToProps, mapDispatchToProps)(ProfileSetting);

export default ProfileSetting;
