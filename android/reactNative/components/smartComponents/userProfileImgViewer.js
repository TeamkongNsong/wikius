import React, { Component } from 'react';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import BackButton from '../dumbComponents/onRegisterComponents/backButton';

class UserProfileImgViewer extends Component {
  render() {
    return (
      <Modal visible transparent onRequestClose={console.log}>
        <ImageViewer imageUrls={this.props.images} />
        <BackButton />
      </Modal>
    );
  }
}

export default UserProfileImgViewer;
