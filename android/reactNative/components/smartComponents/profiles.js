import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
 View,
 Dimensions,
} from 'react-native';

import * as profilesActions from '../../actions/profilesActions';
import UserProfile from '../dumbComponents/profiles/userProfile';

class Profiles extends Component {
  componentWillMount() {
    this.windowSize = Dimensions.get('window');
  }

  render() {
    return (
      <View>
        <UserProfile
          userInProfile={this.props.userInProfile}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userInProfile: state.profilesManager.userInProfile,
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => dispatch(profilesActions.fetchProfile()),
  getProfile: idx => dispatch(profilesActions.getProfile(idx)),
});

Profiles = connect(mapStateToProps, mapDispatchToProps)(Profiles);

export default Profiles;
