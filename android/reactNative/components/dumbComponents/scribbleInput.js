import React, { Component } from 'react';
import {
  View,
  Button,
  TextInput,
} from 'react-native';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';

class ScribbleInput extends Component {
  render() {
    return (
      <PopupDialog
        ref={(scribbleInput) => { if (scribbleInput) this.props.setScribbleInput(scribbleInput); }}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
        width={this.props.windowSize.width - 50}
        height={200}
        overlayOpacity={0.4}
        dialogStyle={0}
      >
        <View style={{ width: this.props.windowSize.width - 50, height: 100 }}>
          <TextInput
            onChangeText={(title) => { this.title = title; }}
            placeholder="제목을 입력해주세요."
          />
          <TextInput
            numberOfLines={10}
            multiline
            onChangeText={(message) => { this.message = message; }}
            placeholder="메시지를 입력해주세요."
          />
          <Button
            title="낙서하기"
            onPress={() => { this.props.scribble(this.title, this.message); }}
          />
        </View>
      </PopupDialog>
    );
  }
}

export default ScribbleInput;
