import * as types from '../actions/actionTypes';

const initialState = {
  nickname: null,
  checkNick: '',
  checkButtonOpacity: 0,
};

const nicknameManager = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_CHECK_NICKNAME: {
      const checkButtonOpacity = action.check ? 0 : 1;

      return Object.assign({}, state, {
        nickname: action.nickname,
        checkNick: action.checkNick,
        checkButtonOpacity,
      });
    }

    case types.REFRESH_NICKNAME:
      return Object.assign({}, state, {
        nickname: action.nickname,
      });

    default:
      return state;
  }
};

export default nicknameManager;
