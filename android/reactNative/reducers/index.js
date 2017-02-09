import { combineReducers } from 'redux';
import routes from './routes';
import logInManager from './logInManager';
import nicknameManager from './nicknameManager';
import mapManager from './mapManager';

const reducers = combineReducers({
  logInManager,
  routes,
  nicknameManager,
  mapManager,
});

export default reducers;
