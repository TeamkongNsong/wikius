import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = {
  fontSize: 25,
  height: 30,
  color: 'grey',
};

class BackButton extends Component {
  render() {
    return (
      <ActionButton
        buttonColor="rgba(255, 255, 255, 0)"
        offsetX={15} offsetY={0}
        position="left"
        icon={<Icon name="md-close" style={styles} />}
        onPress={() => {
          if (this.props.callback) this.props.callback();
          Actions.pop();
        }}
        hideShadow
      />
    );
  }
}

export default BackButton;
