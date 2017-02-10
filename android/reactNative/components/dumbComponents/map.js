import React, { Component } from 'react';
import MapView from 'react-native-maps';

import FlagDetail from './flagDetail';

const style = {
  flex: 1,
  zIndex: 0,
};

class Map extends Component {
  render() {
    return (
      <MapView
        style={style}
        region={this.props.region}
        onRegionChange={this.props.refreshGPS}
        showsUserLocation
        toolbarEnabled={false}
      >
        {this.props.flags.map((flag, index) => (
          <MapView.Marker
            key={`${flag.date}${index * 10}`}
            title={flag.nickname}
            description={flag.title}
            coordinate={{
              latitude: flag.latitude,
              longitude: flag.longitude,
            }}
            onCalloutPress={() => {
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
            }}
          />
        ))}
      </MapView>
    );
  }
}

export default Map;
