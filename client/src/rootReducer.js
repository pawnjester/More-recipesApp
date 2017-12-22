import { combineReducers } from 'redux';
import auth from './reducers/auth';
import recipeReducer from './reducers/recipeReducer';
import review from './reducers/reviewReducers';
import recipeDetailReducer from './reducers/recipeDetailReducer';


export default combineReducers({
  auth,
  recipeReducer,
  review,
  recipeDetailReducer,
});
