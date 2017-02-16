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
        ref={(scribbleInput) => {
          if (scribbleInput) {
            this.scribbleInput = scribbleInput;
            this.props.setScribbleInput(scribbleInput);
          }
        }}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
        width={this.props.windowSize.width - 50}
        height={200}
        overlayOpacity={0.4}
      >
        <View style={{ width: this.props.windowSize.width - 50, height: 100 }}>
          <TextInput
            ref={(title) => { this.titleComponent = title; }}
            onChangeText={(title) => { this.title = title; }}
            placeholder="제목을 입력해주세요."
          />
          <TextInput
            ref={(message) => { this.messageComponent = message; }}
            numberOfLines={10}
            multiline
            onChangeText={(message) => { this.message = message; }}
            placeholder="메시지를 입력해주세요."
          />
          <Button
            title="낙서하기"
            onPress={() => {
              this.scribbleInput.closeDialog();
              this.props.scribble(this.title, this.message);
              this.titleComponent.setNativeProps({ text: '' });
              this.messageComponent.setNativeProps({ text: '' });
            }}
          />
        </View>
      </PopupDialog>
    );
  }
}

export default ScribbleInput;
