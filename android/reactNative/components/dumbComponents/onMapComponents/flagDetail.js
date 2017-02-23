import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';

class FlagDetail extends Component {
  constructor() {
    super();
    this.state = {
      button: (<Button title="삭제" onPress={this.deleteAlert} />),
    };
  }

  deleteAlert() {
    return Alert.alert(
      '경고',
      '정말 삭제하시겠습니까?',
      [
        { text: '아니오' },
        { text: '네',
          onPress: () => {
            this.flagDetailBody.closeDialog();
            this.props.deleteFlag();
          },
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <PopupDialog
        ref={(flagDetailBody) => {
          if (flagDetailBody) {
            this.flagDetailBody = flagDetailBody;
            this.props.setFlagDetailBody(flagDetailBody);
          }
        }}
        width={this.props.windowSize.width - 50}
        height={200}
        overlayOpacity={0.4}
      >
        <View style={{ width: this.props.windowSize.width - 50, height: 100 }}>
          <Text style={{ textAlign: 'center' }}>{this.props.flag.nickname}</Text>
          <Text style={{ textAlign: 'center' }}>{this.props.flag.title}</Text>
          <Text style={{ textAlign: 'right' }}>{this.props.flag.date}</Text>
          <Text style={{ textAlign: 'left' }}>{this.props.flag.message}</Text>
          {this.props.flag.isWriterOfFlag ? this.state.button : <Text />}
        </View>
      </PopupDialog>
    );
  }
}

export default FlagDetail;
