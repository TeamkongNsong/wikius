import * as types from '../actions/actionTypes';

const initialState = {
  userInProfile: {
    idx: null,
    nickname: null,
    image: null,
    stateMessage: null,
    isMine: false,
  },
  timeline: [],
};

const profilesManager = (state = initialState, action) => {
  switch (action.type) {
    case types.REFRESH_PROFILE:
      return Object.assign({}, state, {
        userInProfile: action.userInProfile,
      });

    case types.REFRESH_TIMELINE:
      return Object.assign({}, state, {
        timeline: action.timeline,
      });

    default:
      return state;
  }
};

export default profilesManager;
