import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = {
  fontSize: 20,
  height: 22,
  color: 'white',
};

class ScribbleButton extends Component {
  render() {
    return (
      <ActionButton
        buttonColor="rgba(200, 0, 0, 0.5)" btnOutRange="rgba(0, 0, 200, 0.5)"
        offsetX={15} offsetY={0}
        position="center"
        icon={<Icon name="md-create" style={styles} />}
        onPress={() => { this.props.scribbleInput.openDialog(); }}
      />
    );
  }
}

export default ScribbleButton;
