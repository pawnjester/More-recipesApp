import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import recipeReducer from './reducers/recipeReducer';


export default combineReducers({
  flashMessages,
  auth,
  recipeReducer
});
