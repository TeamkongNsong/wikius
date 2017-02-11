import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
 View,
 TextInput,
 Text,
} from 'react-native';

import * as searchActions from '../actions/searchActions';

import UserProfile from './dumbComponents/profiles/userProfile';

let delay = setTimeout(() => {}, 0);

class SearchUser extends Component {
  render() {
    return (
      <View>
        <TextInput
          placeholder="검색어를 입력하세요"
          onChangeText={(word) => {
            clearTimeout(delay);
            delay = setTimeout(() => {
              this.props.fetchSearch(this.props.host, word);
            }, 1000);
          }}
        />
        {
          this.props.searchResult.length === 0
          ? <Text style={{ textAlign: 'center' }}>검색된 유저가 없습니다.</Text>
          : this.props.searchResult.map((user, index) => (
            <UserProfile
              key={`UserProfiles${index * 10}`}
              userInProfile={{
                image: user.img,
                nickname: user.nickname,
                stateMessage: user.state_message,
              }}
            />
          ))
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  host: state.logInManager.host,
  searchResult: state.searchManager.searchResult,
});

const mapDispatchToProps = dispatch => ({
  fetchSearch: (host, word) => dispatch(searchActions.fetchSearch(host, word)),
});

SearchUser = connect(mapStateToProps, mapDispatchToProps)(SearchUser);

export default SearchUser;
