import * as types from '../actions/actionTypes';

const initialState = {
  userInProfile: {
    image: null,
    nickname: null,
    stateMessage: null,
  },
};

const profilesManager = (state = initialState, action) => {
  switch (action.type) {
    case types.REFRESH_PROFILE:
      return Object.assign({}, state, {
        userInProfile: action.userInProfile,
      });

    default:
      return state;
  }
};

export default profilesManager;
