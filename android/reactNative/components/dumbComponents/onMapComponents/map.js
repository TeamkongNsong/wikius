import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { AsyncStorage } from 'react-native';
import { host, key } from '../../../../../configure';

const style = {
  flex: 1,
  zIndex: 0,
};

class Map extends Component {
  onCalloutPressed(flag) {
    return this.props.fetchWithHeaders(`flags/check/${flag.idx}`, 'GET')
      .then((res) => {
        const isWriterOfFlag = JSON.parse(res._bodyText).check;
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
        ref={this.props.refreshMap}
        style={style}
        showsUserLocation
        region={this.props.region}
        toolbarEnabled={false}
        onRegionChangeComplete={(changedRegion) => {
          const changedZoomLevel = Math.log(360 / changedRegion.longitudeDelta) / Math.LN2;
          const numberOfFlags = changedZoomLevel > 6 ? 5 : 0;
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
