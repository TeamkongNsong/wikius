import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';

import { s3Config } from '../../../../../configure';

const options = {
  imagePicker: {
    title: '사진을 선택해주세요',
    customButtons: [
      { name: 'viewImage', title: 'View Image' },
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  },
  s3Config,
};

class UserProfileImg extends Component {
  constructor() {
    super();
    this.state = {
      image: require('../../../resource/image/user_default.png'),
    };
  }

  componentDidMount() {
    const image = this.props.userInProfile.image === null
      ? require('../../../resource/image/user_default.png')
      : { uri: this.props.userInProfile.image };

    this.setState({
      image
    });
  }

  moveToImageViewer() {
    return this.props.fetchWithHeaders('users/me/image', 'GET')
      .then((images) => {
        Actions.userProfileImgViewer({ images });
      });
  }

  putImageToS3(file) {
    RNS3.put(file, options.s3Config(`${this.props.userInProfile.idx}/profile/`))
    .then((res) => {
      if (res.status !== 201) {
        throw new Error('Failed to upload image to S3');
      }
      const imageUrl = res.body.postResponse.location;
      console.log(`Succeeded to upload image to S3: ${imageUrl}`);

      this.props.fetchWithHeaders('users/me/image', 'PUT', {
        image: imageUrl,
      })
      .then(() => {
        console.log('프로필 사진 업로드 성공!');
        this.setState({
          image: {
            uri: imageUrl,
          },
        });
      })
      .catch((err) => { console.log('프로필 사진 업로드 중 에러 발생!', err); });
    });
  }

  selectWhatToDo() {
    return ImagePicker.showImagePicker(options.imagePicker, (response) => {
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton && this.props.userInProfile.image !== null) {
        this.moveToImageViewer();
      } else {
        const image = this.props.userInProfile.image;
        let imageNo = 0;
        if (image !== null) {
          const slashIndex = image.lastIndexOf('%2F');
          const dotIndex = image.lastIndexOf('.png');
          imageNo = parseInt(image.slice(slashIndex + 3, dotIndex));
        }

        const file = {
          uri: response.uri,
          name: `${imageNo + 1}.png`,
          type: 'image/png',
        };

        this.putImageToS3(file);
      }
    });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          if (this.props.isMine) {
            this.selectWhatToDo();
          } else if (this.props.userInProfile.image !== null) {
            this.moveToImageViewer();
          }
        }}
      >
        <Image
          style={{ width: 80, height: 80, borderRadius: 100, borderWidth: 0.1, borderColor: '#d6d7da' }}
          source={this.state.image}
        />
      </TouchableOpacity>
    );
  }
}

export default UserProfileImg;
