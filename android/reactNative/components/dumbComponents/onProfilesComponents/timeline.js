import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import Post from './post';

class Timeline extends Component {
  render() {
    return (
      <ScrollView>
        {
          this.props.timeline.map((post, index) => (
            <Post
              key={`${post.created_at}${post.nickname}${index * 10}`}
              post={post}
              refreshGPS={this.props.refreshGPS}
              region={this.props.region}
              map={this.props.map}
            />
          ))
        }
      </ScrollView>
    );
  }
}

export default Timeline;
