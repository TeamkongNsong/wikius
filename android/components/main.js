import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Button,
} from 'react-native';
import MapView from 'react-native-maps';
import * as mapActions from '../actions/mapActions';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
};

class Main extends Component {
  componentDidMount() {
    this.props.fetchFlags();
    this.props.initializeUserRegion();
  }

  scribblePress() {
    console.log('2',JSON.stringify(this.props.userRegion));

    this.props.scribble('추후변경');

  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.props.region}
          onRegionChange={this.props.refreshGPS}
          showsUserLocation
        >
          {
            this.props.flags.map((flag, index) => (
                <MapView.Marker
                  key={index}
                  title={flag.nickname}
                  description={flag.message}
                  coordinate={{
                    latitude: flag.latitude,
                    longitude: flag.longitude,
                  }}
                />
              )
            )
          }
        </MapView>
        <View style={{ top: 300, left: 10, width: 100 }}>
          <Button title="낙서하기" onPress={this.scribblePress.bind(this)} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  region: state.mapManager.region,
  flags: state.mapManager.flags,
  userRegion: state.mapManager.userRegion,
});

const mapDispatchToProps = dispatch => ({
  checkGPS: () => dispatch(mapActions.checkGPS()),
  scribble: message => dispatch(mapActions.scribble(message)),
  refreshGPS: region => dispatch(mapActions.refreshGPS(region)),
  getUserRegion: () => dispatch(mapActions.getUserRegion()),
  fetchFlags: () => dispatch(mapActions.fetchFlags()),
  initializeUserRegion: () => dispatch(mapActions.initializeUserRegion()),
});

Main = connect(mapStateToProps, mapDispatchToProps)(Main);

export default Main;
