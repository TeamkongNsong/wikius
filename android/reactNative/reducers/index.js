import { combineReducers } from 'redux';
import routes from './routes';
import logInManager from './logInManager';
import nicknameManager from './nicknameManager';
import mapManager from './mapManager';
import profilesManager from './profilesManager';
import searchManager from './searchManager';
import profileSettingManager from './profileSettingManager';

const reducers = combineReducers({
  logInManager,
  routes,
  nicknameManager,
  mapManager,
  profilesManager,
  searchManager,
  profileSettingManager,
});

export default reducers;
