import { combineReducers } from 'redux';
import auth from './auth';
import recipeReducer from './recipeReducer';
import review from './reviewReducers';
import recipeDetailReducer from './recipeDetailReducer';
import voteReducer from './voteRecipe';


export default combineReducers({
  auth,
  recipeReducer,
  review,
  recipeDetailReducer,
  voteReducer,
});
