import * as types from '../actions/actionTypes';

const initialState = {
  nickname: null,
  checkDuplicatedNick: ' ',
  check: true,
  modified: false,
};

const nicknameManager = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_CHECK_NICKNAME: {
      return Object.assign({}, state, {
        nickname: action.nickname,
        checkDuplicatedNick: action.checkDuplicatedNick,
        check: action.check,
        modified: action.modified,
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
