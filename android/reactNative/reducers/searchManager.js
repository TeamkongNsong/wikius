import * as types from '../actions/actionTypes';

const initialState = {
  searchResult: [],
};

const searchManager = (state = initialState, action) => {
  switch (action.type) {
    case types.REFRESH_SEARCH_RESULT:
      return Object.assign({}, state, {
        searchResult: action.searchResult,
      });

    default:
      return state;
  }
};

export default searchManager;
