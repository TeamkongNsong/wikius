import * as types from '../actions/actionTypes';

const initialState = {
  friends: [],
  blocked: [],
  request: [],
  receive: [],
};

const friendsManager = (state = initialState, action) => {
  switch (action.type) {
    case types.REFRESH_FRIENDS:
      return Object.assign({}, state, {
        friends: action.friends,
        blocked: action.blocked,
        request: action.request,
        receive: action.receive,
      });

    default:
      return state;
  }
};

export default friendsManager;
