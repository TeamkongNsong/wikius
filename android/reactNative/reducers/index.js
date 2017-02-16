import { combineReducers } from 'redux';
import routes from './routes';
import logInManager from './logInManager';
import registerManager from './registerManager';
import nicknameManager from './nicknameManager';
import mapManager from './mapManager';
import profilesManager from './profilesManager';
import searchManager from './searchManager';
import profileSettingManager from './profileSettingManager';
import friendsManager from './friendsManager';

const reducers = combineReducers({
  logInManager,
  registerManager,
  routes,
  nicknameManager,
  mapManager,
  profilesManager,
  searchManager,
  profileSettingManager,
  friendsManager,
});

export default reducers;
