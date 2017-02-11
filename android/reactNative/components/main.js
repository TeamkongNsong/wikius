import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  BackAndroid,
  Dimensions,
  Button,
} from 'react-native';

import * as mapActions from '../actions/mapActions';
import * as profilesActions from '../actions/profilesActions';

import Map from './dumbComponents/map';
import ScribbleInput from './dumbComponents/scribbleInput';
import ScribbleButton from './dumbComponents/scribbleButton';
import MenuButton from './dumbComponents/menuButton';
import FlagDetail from './dumbComponents/flagDetail';

const propTypes = {
  fetchFlags: React.PropTypes.func,
  initializeUserRegion: React.PropTypes.func,
  region: React.PropTypes.object,
  refreshGPS: React.PropTypes.func,
  flags: React.PropTypes.array,
  setFlagDetail: React.PropTypes.func,
  flagDetailBody: React.PropTypes.object,
  host: React.PropTypes.string,
  nickname: React.PropTypes.string,
  scribbleInput: React.PropTypes.object,
  fetchProfile: React.PropTypes.func,
  scribble: React.PropTypes.func,
  setScribbleInput: React.PropTypes.func,
  flagDetail: React.PropTypes.object,
  setFlagDetailBody: React.PropTypes.func,
  deleteFlag: React.PropTypes.func,
};

const defaultProps = {
  fetchFlags: null,
  initializeUserRegion: null,
  region: null,
  refreshGPS: null,
  flags: null,
  setFlagDetail: null,
  flagDetailBody: null,
  host: null,
  nickname: null,
  scribbleInput: null,
  fetchProfile: null,
  scribble: null,
  setScribbleInput: null,
  flagDetail: null,
  setFlagDetailBody: null,
  deleteFlag: null,
};

class Main extends Component {
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => true);
    this.windowSize = Dimensions.get('window');
  }

  componentDidMount() {
    this.props.fetchFlags();
    this.props.getUserRegion();
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 1 }}>
          <Map
            region={this.props.region}
            refreshGPS={this.props.refreshGPS}
            flags={this.props.flags}
            setFlagDetail={this.props.setFlagDetail}
            flagDetailBody={this.props.flagDetailBody}
            host={this.props.host}
            nickname={this.props.nickname}
            fetchFlags={this.props.fetchFlags}
            setZoomLevelState={this.props.setZoomLevelState}
            zoomLevel={this.props.zoomLevel}
          />

          <ScribbleButton
            scribbleInput={this.props.scribbleInput}
          />

          <MenuButton
            fetchProfile={this.props.fetchProfile}
            fetchFlags={this.props.fetchFlags}
            zoomLevel={this.props.zoomLevel}
          />

          <ScribbleInput
            scribble={this.props.scribble}
            setScribbleInput={this.props.setScribbleInput}
            windowSize={this.windowSize}
          />

          <FlagDetail
            windowSize={this.windowSize}
            flag={this.props.flagDetail}
            setFlagDetailBody={this.props.setFlagDetailBody}
            deleteFlag={this.props.deleteFlag}
          />
        </View>
        <View style={{ flex: 0 }}>
        </View>
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
  flagDetail: state.mapManager.flagDetail,
  // flagDetail
  flagDetailBody: state.mapManager.flagDetailBody,
  // flagDetail을 표현해 줄 텍스트박스
  host: state.logInManager.host,
  // host 주소
  nickname: state.nicknameManager.nickname,
  // nickname
  zoomLevel: state.mapManager.zoomLevel,
  // zoomLevel
});

const mapDispatchToProps = dispatch => ({
  refreshGPS: region => dispatch(mapActions.refreshGPS(region)),
  // state에 현재 region값을 저장한다
  getUserRegion: () => dispatch(mapActions.getUserRegion()),
  // state의 userRegion, region값을 현재 GPS값으로 갱신한다
  fetchFlags: numberOfFlags => dispatch(mapActions.fetchFlags(numberOfFlags)),
  // 현재 보고 있는 화면에서 가까운 numberOfFlags개 만큼의 플래그들을 받아 state의 flags에 저장한다
  scribble: (title, message) => dispatch(mapActions.scribble(title, message)),
  // 플래그를 박는다
  setScribbleInput: scribbleInput => dispatch(mapActions.setScribbleInput(scribbleInput)),
  // state에 scribbleInput를 저장한다
  setFlagDetail: flagDetail => dispatch(mapActions.setFlagDetail(flagDetail)),
  // flagDetail을 갱신한다
  setFlagDetailBody: flagDetailBody => dispatch(mapActions.setFlagDetailBody(flagDetailBody)),
  // flagDetailBody를 갱신한다
  deleteFlag: () => dispatch(mapActions.deleteFlag()),
  // flagDetail에 해당하는 flag를 삭제한다
  fetchProfile: callback => dispatch(profilesActions.fetchProfile(callback)),
  // Profile 화면을 갱신한다
  setZoomLevelState: zoomLevel => dispatch(mapActions.setZoomLevelState(zoomLevel)),
  // 현재 지도 확대율을 저장한다
});

Main = connect(mapStateToProps, mapDispatchToProps)(Main);

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
