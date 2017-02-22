import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import * as loginActions from '../../actions/loginActions';
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
          fetchSearch={this.props.fetchSearch}
          searchResult={this.props.searchResult}
          getTimelineOfUser={this.props.getTimelineOfUser}
          refreshProfile={this.props.refreshProfile}
          fetchWithHeaders={this.props.fetchWithHeaders}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  scene: state.routes.scene,
  searchResult: state.searchManager.searchResult,
});

const mapDispatchToProps = dispatch => ({
  fetchWithHeaders: (url, method, body) =>
    dispatch(loginActions.fetchWithHeaders(url, method, body)),
  fetchSearch: word => dispatch(searchActions.fetchSearch(word)),
  refreshProfile: userInProfile => dispatch(profilesActions.refreshProfile(userInProfile)),
  getTimelineOfUser: userIdx => dispatch(profilesActions.getTimelineOfUser(userIdx)),
});

SearchUser = connect(mapStateToProps, mapDispatchToProps)(SearchUser);

export default SearchUser;
