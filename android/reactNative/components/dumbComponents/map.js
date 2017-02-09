import React, { Component } from 'react';
import MapView from 'react-native-maps';

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
      >
        {
          this.props.flags.map((flag, index) =>
            (
              <MapView.Marker
                key={`Marker. ${index}`}
                title={flag.nickname}
                description={flag.title}
                coordinate={{
                  latitude: flag.latitude,
                  longitude: flag.longitude,
                }}
              />
            )
          )
        }
      </MapView>
    );
  }
}

export default Map;
