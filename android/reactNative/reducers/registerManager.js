import * as types from '../actions/actionTypes';

const initialState = {
  id: null,
  checkDuplicatedId: ' ',
  check: true,
  password: null,
  password2: null,
  isProperPassword: false,
  checkProperPasswordText: ' ',
};

const nicknameManager = (state = initialState, action) => {
  switch (action.type) {
    case types.CHECK_PROPER_ID:
      return Object.assign({}, state, {
        id: action.id,
        check: action.check,
        checkDuplicatedId: action.checkDuplicatedId,
      });

    case types.INPUT_PASSWORD:
      return Object.assign({}, state, {
        password: action.password,
      });

    case types.INPUT_PASSWORD2:
      return Object.assign({}, state, {
        password2: action.password2,
      });

    case types.REFRESH_CHECK_PROPER_PASSWORD_TEXT: {
      const isProperPassword = action.checkProperPasswordText === 'good';
      const checkProperPasswordText = isProperPassword ? ' ' : action.checkProperPasswordText;
      return Object.assign({}, state, {
        isProperPassword,
        checkProperPasswordText,
      });
    }

    default:
      return state;
  }
};

export default nicknameManager;
