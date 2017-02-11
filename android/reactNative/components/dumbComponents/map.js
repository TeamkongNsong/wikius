import React, { Component } from 'react';
import MapView from 'react-native-maps';

const style = {
  flex: 1,
  zIndex: 0,
};

const propTypes = {
  region: React.PropTypes.object.isRequired,
  refreshGPS: React.PropTypes.func.isRequired,
  flags: React.PropTypes.array.isRequired,
  host: React.PropTypes.string.isRequired,
  setFlagDetail: React.PropTypes.func.isRequired,
  nickname: React.PropTypes.string,
  flagDetailBody: React.PropTypes.object,
};

const defaultProps = {
  flagDetailBody: null,
  nickname: null,
};

class Map extends Component {
  onCalloutPressed(flag) {
    fetch(`${this.props.host}/flags/${this.props.nickname}?idx=${flag.idx}`)
    .then((res) => {
      const isWriterOfFlag = JSON.parse(res._bodyText);
      this.props.setFlagDetail({
        idx: flag.idx,
        nickname: flag.nickname,
        title: flag.title,
        message: flag.message,
        date: flag.date,
        isWriterOfFlag,
      });
      this.props.flagDetailBody.openDialog();
    });
  }

  markers(flags) {
    return flags.map((flag, index) => (
      <MapView.Marker
        key={`${flag.date}${index * 10}`}
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

Map.propTypes = propTypes;
Map.defaultProps = defaultProps;

export default Map;
