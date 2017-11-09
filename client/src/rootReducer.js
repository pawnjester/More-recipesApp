import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import redRecipe from './reducers/red_recipe';


export default combineReducers({
  flashMessages,
  auth,
  redRecipe
});
