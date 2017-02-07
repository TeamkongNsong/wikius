import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Button,
  Text,
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
  constructor() {
    super();
    this.state = {
      marker: (
        <MapView.Marker
          coordinate={{
            latitude: 0,
            longitude: 0,
          }}
          title='타이틀'
          description='좋군'
        />
      ),
    }
  }

  componentDidMount() {
    this.props.checkGPS();
  }

  onMapPress(e) {
    console.log(e.nativeEvent.coordinate);
  }

  markerCreater() {
    this.setState({
      marker: (
        <MapView.Marker
          coordinate={{
            latitude: this.props.region.latitude,
            longitude: this.props.region.longitude,
          }}
          title='타이틀'
          description='좋군'
        />
      ),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.props.region}
          showsUserLocation
          onPress={e => this.onMapPress(e)}
        >
        <MapView.Marker
          coordinate={{
            latitude: this.props.region.latitude,
            longitude: this.props.region.longitude,
          }}
          title='타이틀'
          description='좋군'
          image={require('../app/src/image/marker_blue.png')}
        />
        </MapView>
        <View style={{ top: 300, left: 10, width: 100 }}>
          <Button title="Flag 박기" onPress={this.markerCreater.bind(this)} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  region: state.mapManager.region,
});

const mapDispatchToProps = dispatch => ({
  checkGPS: () => dispatch(mapActions.checkGPS()),
});

Main = connect(mapStateToProps, mapDispatchToProps)(Main);

export default Main;
