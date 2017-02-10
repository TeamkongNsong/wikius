import { combineReducers } from 'redux';
import routes from './routes';
import logInManager from './logInManager';
import nicknameManager from './nicknameManager';
import mapManager from './mapManager';
import profilesManager from './profilesManager';

const reducers = combineReducers({
  logInManager,
  routes,
  nicknameManager,
  mapManager,
  profilesManager,
});

export default reducers;
