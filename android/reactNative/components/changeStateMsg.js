import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
 View,
 TextInput,
 Text,
 Dimensions,
 Button,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = {
  fontSize: 30,
  height: 30,
  color: 'black',
};

class ChangeStateMsg extends Component {
  constructor() {
    super();
    this.state = {
      stateMsgLength: 0,
    };
  }

  componentWillMount() {
    this.windowSize = Dimensions.get('window');
  }

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <TextInput
          style={{ top: (this.windowSize.height / 2) - 60, width: 200, textAlign: 'center' }}
          placeholder="상태 메시지를 입력해주세요."
          maxLength={60}
          onChangeText={(stateMsg) => {
            this.setState({
            stateMsgLength: stateMsg.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length,
            });
          }}
        />
        <Text style={{ top: (this.windowSize.height / 2) - 130, textAlign: 'center' }}>
          {this.state.stateMsgLength}/60
        </Text>
        <ActionButton
          buttonColor="rgba(0, 0, 0, 0)"
          offsetX={15} offsetY={0}
          position="right"
          icon={<Icon name="md-checkmark" style={styles} />}
          onPress={() => {  }}
          hideShadow
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

ChangeStateMsg = connect(mapStateToProps, mapDispatchToProps)(ChangeStateMsg);

export default ChangeStateMsg;
