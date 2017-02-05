import { combineReducers } from 'redux';
import routes from './routes';
import logInManager from './logInManager';
import nicknameManager from './nicknameManager';

const reducers = combineReducers({
  logInManager,
  routes,
  nicknameManager,
});

export default reducers;
