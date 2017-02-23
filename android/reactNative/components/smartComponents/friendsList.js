import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import * as loginActions from '../../actions/loginActions';
import * as friendsActions from '../../actions/friendsActions';
import * as profilesActions from '../../actions/profilesActions';
import Friends from '../dumbComponents/onFriendsListComponents/friends';

class FriendsList extends Component {
  render() {
    return (
      <View>
        <Friends
          fetchWithHeaders={this.props.fetchWithHeaders}
          friends={this.props.friends}
          blocked={this.props.blocked}
          request={this.props.request}
          receive={this.props.receive}
          fetchFriends={this.props.fetchFriends}
          moveToProfiles={this.props.moveToProfiles}
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
  fetchWithHeaders: (url, method, body) =>
    dispatch(loginActions.fetchWithHeaders(url, method, body)),
  fetchFriends: () => dispatch(friendsActions.fetchFriends()),
  moveToProfiles: userInProfile => dispatch(profilesActions.moveToProfiles(userInProfile)),
});

FriendsList = connect(mapStateToProps, mapDispatchToProps)(FriendsList);

export default FriendsList;
