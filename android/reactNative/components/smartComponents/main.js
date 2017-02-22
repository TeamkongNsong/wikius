/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Dimensions,
} from 'react-native';

import * as mapActions from '../../actions/mapActions';
import * as profilesActions from '../../actions/profilesActions';
import * as loginActions from '../../actions/loginActions';
import Map from '../dumbComponents/onMapComponents/map';
import ScribbleInput from '../dumbComponents/onMapComponents/scribbleInput';
import ScribbleButton from '../dumbComponents/onMapComponents/scribbleButton';
import MenuButton from '../dumbComponents/onMapComponents/menuButton';
import FlagDetail from '../dumbComponents/onMapComponents/flagDetail';
import { host } from '../../../../configure';

class Main extends Component {
  componentWillMount() {
    this.windowSize = Dimensions.get('window');
  }

  componentDidMount() {
    this.props.fetchFlags();
    this.props.getUserRegion(undefined, this.props.animRegion);
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
            host={host}
            nickname={this.props.nickname}
            fetchFlags={this.props.fetchFlags}
            refreshMap={this.props.refreshMap}
          />

          <ScribbleButton
            scribbleInput={this.props.scribbleInput}
          />

          <MenuButton
            fetchFlags={this.props.fetchFlags}
            zoomLevel={this.props.zoomLevel}
            getMyData={this.props.getMyData}
            refreshProfile={this.props.refreshProfile}
            getTimelineOfUser={this.props.getTimelineOfUser}
            logOut={this.props.logOut}
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
      </View>
    );
  }
}

const mapStateToProps = state => ({
  scene: state.routes.scene,
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
  nickname: state.nicknameManager.nickname,
  // nickname
  zoomLevel: state.mapManager.zoomLevel,
  // zoomLevel
});

const mapDispatchToProps = dispatch => ({
  refreshGPS: region => dispatch(mapActions.refreshGPS(region)),
  // state에 현재 region값을 저장한다
  getUserRegion: (cb, animRegion) => dispatch(mapActions.getUserRegion(cb, animRegion)),
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
  getMyData: () => dispatch(profilesActions.getMyData()),
  refreshProfile: userInProfile => dispatch(profilesActions.refreshProfile(userInProfile)),
  logOut: () => dispatch(loginActions.logOut()),
  refreshMap: map => dispatch(mapActions.refreshMap(map)),
  getTimelineOfUser: userIdx => dispatch(profilesActions.getTimelineOfUser(userIdx)),
});

Main = connect(mapStateToProps, mapDispatchToProps)(Main);

export default Main;
