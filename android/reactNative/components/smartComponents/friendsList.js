import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import * as searchActions from '../../actions/searchActions';
import Friends from '../dumbComponents/onFriendsListComponents/friends';

class FriendsList extends Component {
  render() {
    return (
      <View>
        <Friends friends={this.props.friends} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  friends: state.friendsManager.friends,
});

const mapDispatchToProps = dispatch => ({
  fetchFriends: () => dispatch(searchActions.fetchFriends()),
});

FriendsList = connect(mapStateToProps, mapDispatchToProps)(FriendsList);

export default FriendsList;
