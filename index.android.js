import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { Router, Scene } from 'react-native-router-flux';

import reducers from './android/reactNative/reducers';
import LogIn from './android/reactNative/components/smartComponents/logIn';
import LogOut from './android/reactNative/components/smartComponents/logOut';
import MakeNickname from './android/reactNative/components/smartComponents/makeNickname';
import Main from './android/reactNative/components/smartComponents/main';
import Profiles from './android/reactNative/components/smartComponents/profiles';
import SearchUser from './android/reactNative/components/smartComponents/searchUser';
import ProfileSetting from './android/reactNative/components/smartComponents/profileSetting';
import ChangeStateMsg from './android/reactNative/components/smartComponents/changeStateMsg';
import MakeId from './android/reactNative/components/smartComponents/makeId';
import MakePassword from './android/reactNative/components/smartComponents/makePassword';
import FriendsList from './android/reactNative/components/smartComponents/friendsList';

const RouterWithRedux = connect()(Router);
const createStoreWithMiddleware =
  applyMiddleware(thunkMiddleware)(createStore);

const store = createStoreWithMiddleware(reducers);

export default class wikius extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root" hideNavBar initial>
            <Scene key="logIn" component={LogIn} title="LogIn" initial />
            <Scene key="logOut" component={LogOut} title="LogOut" />
            <Scene key="makeId" component={MakeId} title="MakeId" />
            <Scene key="makePassword" component={MakePassword} title="MakePassword" />
            <Scene key="makeNickname" component={MakeNickname} title="makeNickname" />
            <Scene key="main" component={Main} title="Main" />
            <Scene key="profiles" component={Profiles} title="Profiles" />
            <Scene key="searchUser" component={SearchUser} title="SearchUser" />
            <Scene key="profileSetting" component={ProfileSetting} title="ProfileSetting" />
            <Scene key="changeStateMsg" component={ChangeStateMsg} title="ChangeStateMsg" />
            <Scene key="friendsList" component={FriendsList} title="FriendsList" />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('wikius', () => wikius);
