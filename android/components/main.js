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

const Dimensions = require('Dimensions');
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
    this.props.checkGPS();
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.props.region}
          showsUserLocation
        >
          <Text />
        </MapView>
        <View style={{ top: 10, left: 10, width: 100 }}>
          <Button title="Flag 박기" onPress={() => { console.log('flag'); }} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  region: state.region,
});

const mapDispatchToProps = dispatch => ({
  checkGPS: () => dispatch(mapActions.checkGPS()),
});

Main = connect(mapStateToProps, mapDispatchToProps)(Main);

export default Main;
