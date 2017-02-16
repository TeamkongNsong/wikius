import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { host } from '../../../../../configure';

const style = {
  flex: 1,
  zIndex: 0,
};

class Map extends Component {
  onCalloutPressed(flag) {
    fetch(`${host}/flags/check/${flag.idx}`)
    .then((res) => {
      const isWriterOfFlag = JSON.parse(res._bodyText);
      this.props.setFlagDetail({
        idx: flag.idx,
        nickname: flag.nickname,
        title: flag.title,
        message: flag.message,
        date: flag.created_at,
        isWriterOfFlag,
      });
      this.props.flagDetailBody.openDialog();
    });
  }

  markers(flags) {
    return flags.map((flag, index) => (
      <MapView.Marker
        key={`${flag.created_at}${index * 10}`}
        title={flag.nickname}
        description={flag.title}
        coordinate={{
          latitude: flag.latitude,
          longitude: flag.longitude,
        }}
        onCalloutPress={() => { this.onCalloutPressed(flag); }}
      />
    ));
  }

  render() {
    return (
      <MapView
        style={style}
        showsUserLocation
        region={this.props.region}
        toolbarEnabled={false}
        onRegionChange={(changedRegion) => {
          this.props.refreshGPS(changedRegion);
          const changedZoomLevel = Math.log(360 / changedRegion.longitudeDelta) / Math.LN2;
          if (!isNaN(changedZoomLevel)) this.props.setZoomLevelState(changedZoomLevel);
        }}
        onRegionChangeComplete={(changedRegion) => {
          const numberOfFlags = this.props.zoomLevel > 6 ? 5 : 0;
          this.props.refreshGPS(changedRegion);
          this.props.fetchFlags(numberOfFlags);
        }}
      >
        {this.markers(this.props.flags)}
      </MapView>
    );
  }
}

export default Map;
