import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = {
  fontSize: 20,
  height: 22,
  color: 'white',
};

class MenuButton extends Component {
  render() {
    return (
      <ActionButton buttonColor="rgba(0, 0, 200, 0.5)">
        <ActionButton.Item
          buttonColor="rgba(0, 200, 0, 0.5)"
          onPress={() => console.log('user info!!!!!!!')}
        >
          <Icon name="md-person" style={styles} />
        </ActionButton.Item>
      </ActionButton>
    );
  }
}

export default MenuButton;
