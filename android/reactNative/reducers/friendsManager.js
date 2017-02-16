import * as types from '../actions/actionTypes';

const initialState = {
  friends: [],
};

const friendsManager = (state = initialState, action) => {
  switch (action.type) {
    case types.REFRESH_FRIENDS:
      return Object.assign({}, state, {
        friends: action.friends,
      });

    default:
      return state;
  }
};

export default friendsManager;
