import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
 View,
 BackAndroid,
 Dimensions,
} from 'react-native';

import UserProfile from './dumbComponents/profiles/userProfile';

class Profiles extends Component {
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => true);
    this.windowSize = Dimensions.get('window');
  }

   render() {
     return (
      <View>
        <UserProfile
          userInProfile={this.props.userInProfile}
          windowSize={this.windowSize}
        />
      </View>
     );
   }
}

const mapStateToProps = state => ({
  userInProfile: state.profilesManager.userInProfile,
});

// const mapDispatchToProps = dispatch => ({
//   changeNick: dispatch(profileManager.changeNick()),
// });
Profiles = connect(mapStateToProps)(Profiles);

export default Profiles;
