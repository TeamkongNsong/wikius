import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
} from 'react-native';

class Main extends Component {
  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>
          ~~~~~~~~Main~~~~~~~~~
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

Main = connect(mapStateToProps, mapDispatchToProps)(Main);

export default Main;
