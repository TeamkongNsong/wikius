import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

const styles = {
  fontSize: 20,
  height: 22,
  color: 'white',
};

const propTypes = {
  fetchProfile: React.PropTypes.func.isRequired,
  fetchFlags: React.PropTypes.func.isRequired,
};

class MenuButton extends Component {
  render() {
    return (
      <ActionButton buttonColor="rgba(0, 0, 200, 0.5)" offsetX={15} offsetY={0}>
        <ActionButton.Item
          buttonColor="rgba(0, 200, 0, 0.5)"
          onPress={() => { this.props.fetchProfile(Actions.profiles); }}
          offsetX={29}
        >
          <Icon name="md-person" style={styles} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="rgba(0, 200, 0, 0.5)"
          onPress={() => {
            const numberOfFlags = this.props.zoomLevel > 6 ? 5 : 0;
            this.props.fetchFlags(numberOfFlags);
          }}
          offsetX={29}
        >
          <Icon name="md-refresh" style={styles} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="rgba(0, 200, 0, 0.5)"
          onPress={Actions.searchUser}
          offsetX={29}
        >
          <Icon name="md-search" style={styles} />
        </ActionButton.Item>
      </ActionButton>
    );
  }
}

MenuButton.propTypes = propTypes;

export default MenuButton;
