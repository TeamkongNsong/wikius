import { AsyncStorage } from 'react-native';

import * as types from './actionTypes';
import { host, key } from '../../../configure';

const loading = () => ({
  type: types.LOADING,
});

const refreshSearchResult = searchResult => ({
  type: types.REFRESH_SEARCH_RESULT,
  searchResult,
});

export function fetchSearch(word) {
  return (dispatch) => {
    dispatch(loading());

    if (word === '') return dispatch(refreshSearchResult([]));

    return AsyncStorage.getItem(key)
      .then(data => JSON.parse(data))
      .then((parsedData) => {
        fetch(`${host}/users/search/${word}`, {
          method: 'GET',
          headers: parsedData.headers,
        })
        .then((searchedUsers) => {
          const parsedUsers = JSON.parse(searchedUsers._bodyText).result;
          if (parsedUsers.length > 0) {
            return dispatch(refreshSearchResult(parsedUsers));
          }
          dispatch(refreshSearchResult([]));
        });
      });
  };
}
