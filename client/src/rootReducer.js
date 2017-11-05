import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import red_recipe from './reducers/red_recipe';


export default combineReducers({
  flashMessages,
  auth,
  red_recipe
});