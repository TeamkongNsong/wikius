import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = {
  fontSize: 25,
  height: 30,
  color: 'grey',
};

class ConfirmButton extends Component {
  render() {
    if (this.props.check) {
      return (
        <ActionButton
          buttonColor="rgba(255, 255, 255, 0)"
          offsetX={15} offsetY={0}
          position="right"
          icon={<Icon name="md-checkmark" style={styles} />}
          onPress={this.props.callback}
          hideShadow
        />
      );
    }
    return (
      <ActionButton
        buttonColor="rgba(255, 255, 255, 0)"
        offsetX={15} offsetY={0}
        position="right"
        icon={<Icon name="md-checkmark" style={{ color: 'rgba(255, 255, 255, 0)' }} />}
        hideShadow
      />
    );
  }
}

export default ConfirmButton;
