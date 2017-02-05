import * as types from '../actions/actionTypes';

const initialState = {
  host: 'http://52.79.191.124:3333',
  user: null,
};

const logInManager = (state = initialState, action) => {
  switch (action.type) {
    case types.REFRESH_USER:
      return Object.assign({}, state, {
        user: action.user,
      });

    default:
      return state;
  }
};

export default logInManager;
