import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import * as searchActions from '../../actions/searchActions';
import * as profilesActions from '../../actions/profilesActions';
import SearchBar from '../dumbComponents/onSearchUserComponents/searchBar';
import SearchedUsers from '../dumbComponents/onSearchUserComponents/searchedUsers';

class SearchUser extends Component {
  render() {
    return (
      <View>
        <SearchBar fetchSearch={this.props.fetchSearch} />
        <SearchedUsers
          searchResult={this.props.searchResult}
          refreshProfile={this.props.refreshProfile}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  searchResult: state.searchManager.searchResult,
});

const mapDispatchToProps = dispatch => ({
  fetchSearch: word => dispatch(searchActions.fetchSearch(word)),
  refreshProfile: userInProfile => dispatch(profilesActions.refreshProfile(userInProfile)),
});

SearchUser = connect(mapStateToProps, mapDispatchToProps)(SearchUser);

export default SearchUser;
