import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
 View,
} from 'react-native';

import UserProfile from './dumbComponents/profiles/userProfile'

class Profiles extends Component {
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


Profiles = connect(mapStateToProps)(Profiles);

export default Profiles;
