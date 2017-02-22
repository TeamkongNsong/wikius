import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import * as friendsActions from '../../actions/friendsActions';
import * as profilesActions from '../../actions/profilesActions';
import Friends from '../dumbComponents/onFriendsListComponents/friends';

class FriendsList extends Component {
  render() {
    return (
      <View>
        <Friends
          friends={this.props.friends}
          blocked={this.props.blocked}
          request={this.props.request}
          receive={this.props.receive}
          fetchFriends={this.props.fetchFriends}
          getTimelineOfUser={this.props.getTimelineOfUser}
          refreshProfile={this.props.refreshProfile}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  scene: state.routes.scene,
  friends: state.friendsManager.friends,
  blocked: state.friendsManager.blocked,
  request: state.friendsManager.request,
  receive: state.friendsManager.receive,
});

const mapDispatchToProps = dispatch => ({
  fetchFriends: () => dispatch(friendsActions.fetchFriends()),
  getTimelineOfUser: userIdx => dispatch(profilesActions.getTimelineOfUser(userIdx)),
  refreshProfile: userInProfile => dispatch(profilesActions.refreshProfile(userInProfile)),
});

FriendsList = connect(mapStateToProps, mapDispatchToProps)(FriendsList);

export default FriendsList;
