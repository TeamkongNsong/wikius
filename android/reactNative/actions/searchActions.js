import * as types from './actionTypes';

const loading = () => ({
  type: types.LOADING,
});

const refreshSearchResult = searchResult => ({
  type: types.REFRESH_SEARCH_RESULT,
  searchResult,
});

export function fetchSearch(host, word) {
  return (dispatch) => {
    dispatch(loading());

    if (word === '') return dispatch(refreshSearchResult([]));

    return fetch(`${host}/users/search/${word}`)
      .then((searchResult) => {
        const parsedData = JSON.parse(searchResult._bodyText);
        if (parsedData.length === 0) return dispatch(refreshSearchResult([]));
        return dispatch(refreshSearchResult(parsedData));
      });
  };
}
