import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  BackAndroid,
  Dimensions,
} from 'react-native';

import * as mapActions from '../actions/mapActions';

import Map from './dumbComponents/map';
import ScribbleInput from './dumbComponents/scribbleInput';
import ScribbleButton from './dumbComponents/scribbleButton';
import MenuButton from './dumbComponents/menuButton';

class Main extends Component {
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => true);
    this.windowSize = Dimensions.get('window');
  }

  componentDidMount() {
    this.props.fetchFlags();
    this.props.initializeUserRegion();
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Map
          region={this.props.region}
          refreshGPS={this.props.refreshGPS}
          flags={this.props.flags}
        />

        <ScribbleButton
          scribbleInput={this.props.scribbleInput}
        />

        <MenuButton />

        <ScribbleInput
          scribble={this.props.scribble}
          setScribbleInput={this.props.setScribbleInput}
          windowSize={this.windowSize}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  region: state.mapManager.region,
  // 지도로 보고 있는 위치
  flags: state.mapManager.flags,
  // 모든 플래그들
  userRegion: state.mapManager.userRegion,
  // GPS상 위치
  scribbleInput: state.mapManager.scribbleInput,
  // scribble 입력창
});

const mapDispatchToProps = dispatch => ({
  refreshGPS: region => dispatch(mapActions.refreshGPS(region)),
  // state에 현재 region값을 저장한다
  getUserRegion: () => dispatch(mapActions.getUserRegion()),
  // state의 userRegion, region값을 현재 GPS값으로 갱신한다
  fetchFlags: () => dispatch(mapActions.fetchFlags()),
  // DB에 있는 플래그들을 모두 받아 state의 flags에 저장한다
  initializeUserRegion: () => dispatch(mapActions.initializeUserRegion()),
  // 처음 켰을 때 GPS상의 위치로 region값을 갱신한다
  scribble: (title, message) => dispatch(mapActions.scribble(title, message)),
  // 플래그를 박는다
  setScribbleInput: scribbleInput => dispatch(mapActions.setScribbleInput(scribbleInput)),
  // state에 scribbleInput를 저장한다
});

Main = connect(mapStateToProps, mapDispatchToProps)(Main);

export default Main;
