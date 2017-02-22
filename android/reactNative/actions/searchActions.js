import * as loginActions from './loginActions';
import * as types from './actionTypes';

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

    return dispatch(loginActions.fetchWithHeaders(`users/search/${word}`, 'GET'))
      .then((searchedUsers) => {
        const parsedUsers = JSON.parse(searchedUsers._bodyText).result;
        if (parsedUsers.length > 0) {
          return dispatch(refreshSearchResult(parsedUsers));
        }
        dispatch(refreshSearchResult([]));
      });
  };
}
