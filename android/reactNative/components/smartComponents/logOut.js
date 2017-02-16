import React, { Component } from 'react';
import { WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';

class LogOutWebView extends Component {
  componentDidMount() {
    Actions.logIn();
  }

  render() {
    return (
      <WebView source={{ uri: 'https://mail.google.com/mail/u/0/?logout&hl=en' }} />
    );
  }
}

export default LogOutWebView;
