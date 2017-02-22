import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Post extends Component {
  calcDate(date) {
    return `${date.substr(0, 4)}년 ${date.substr(5, 2)}월 ${date.substr(8, 2)}일 ${date.substr(11, 2)}시 ${date.substr(14, 2)}분 ${date.substr(17, 2)}초`;
  }

  render() {
    return (
      <TouchableOpacity
        style={{ borderWidth: 1, borderColor: 'grey', margin: 10, marginBottom: 0 }}
        onPress={() => {
          const region = Object.assign(this.props.region, {
            latitude: this.props.post.latitude,
            longitude: this.props.post.longitude,
            latitudeDelta: 0.009927655360755239,
            longitudeDelta: 0.015449859201908112,
          });
          this.props.refreshGPS();
          this.props.map.animateToRegion(region);
          Actions.main({ type: 'reset', animRegion: region });
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>{this.props.post.title}</Text>
        <Text>{this.props.post.message}</Text>
        <Text>{this.calcDate(this.props.post.created_at)}</Text>
      </TouchableOpacity>
    );
  }
}

export default Post;

// <Text>{this.props.post.nickname}</Text>
// <Text>{this.props.post.latitude}, {this.props.post.longitude}</Text>
// <Text>{this.props.post.modified_at}</Text>
