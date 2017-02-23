import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import * as loginActions from '../../actions/loginActions';
import * as mapActions from '../../actions/mapActions';
import * as friendsActions from '../../actions/friendsActions';
import UserProfile from '../dumbComponents/onProfilesComponents/userProfile';
import BackButton from '../dumbComponents/onRegisterComponents/backButton';
import Timeline from '../dumbComponents/onProfilesComponents/timeline';

class Profiles extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 1.5 }}>
          <UserProfile
            fetchWithHeaders={this.props.fetchWithHeaders}
            isMine={this.props.isMine}
            isFriendStatus={this.props.isFriendStatus}
            friendFromMe={this.props.friendFromMe}
            userInProfile={this.props.userInProfile}
            addFriend={this.props.addFriend}
            cancelAddFriend={this.props.cancelAddFriend}
          />
        </View>
        <View style={{ flex: 8.5, marginBottom: 10 }}>
          <Timeline
            refreshGPS={this.props.refreshGPS}
            region={this.props.region}
            timeline={this.props.timeline}
            userIdx={this.props.userInProfile.idx}
            map={this.props.map}
          />
        </View>
        <BackButton />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  scene: state.routes.scene,
  timeline: state.profilesManager.timeline,
  userInProfile: state.profilesManager.userInProfile,
  region: state.mapManager.region,
  map: state.mapManager.map,
});

const mapDispatchToProps = dispatch => ({
  fetchWithHeaders: (url, method, body) =>
    dispatch(loginActions.fetchWithHeaders(url, method, body)),
  refreshGPS: region => dispatch(mapActions.refreshGPS(region)),
  addFriend: nickname => dispatch(friendsActions.addFriend(nickname)),
  cancelAddFriend: nickname => dispatch(friendsActions.cancelAddFriend(nickname)),
});

Profiles = connect(mapStateToProps, mapDispatchToProps)(Profiles);

export default Profiles;
