import * as types from '../actions/actionTypes';

const initialState = {
  idOnTextInput: '',
  passwordOnTextInput: '',
};

const logInManager = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_ID_ON_TEXT_INPUT:
      return Object.assign({}, state, {
        idOnTextInput: action.idOnTextInput,
      });

    case types.CHANGE_PASSWORD_ON_TEXT_INPUT:
      return Object.assign({}, state, {
        passwordOnTextInput: action.passwordOnTextInput,
      });

    default:
      return state;
  }
};

export default logInManager;
