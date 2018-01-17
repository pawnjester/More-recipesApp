import { combineReducers } from 'redux';
import auth from './auth';
import recipeReducer from './recipeReducer';
import recipeDetailReducer from './recipeDetailReducer';
import userDetailReducer from './userDetailReducer';
import checkEmailReducer from './resetPassword';

export default combineReducers({
  auth,
  recipeReducer,
  recipeDetailReducer,
  userDetailReducer,
  checkEmailReducer
});
