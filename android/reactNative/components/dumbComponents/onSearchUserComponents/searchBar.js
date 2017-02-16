import React, { Component } from 'react';
import { TextInput } from 'react-native';

let delay = setTimeout(() => {}, 0);

class SearchBar extends Component {
  render() {
    return (
      <TextInput
        placeholder="검색어를 입력하세요"
        onChangeText={(word) => {
          clearTimeout(delay);
          delay = setTimeout(() => {
            this.props.fetchSearch(word);
          }, 1000);
        }}
      />
    );
  }
}

export default SearchBar;
