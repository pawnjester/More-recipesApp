/*eslint-disable */
import { ADD_RECIPE } from '../actions/types';

const initialState = {
  recipes: [],
};

const recipes = (state = initialState, action) => {

  switch (action.type) {
    case ADD_RECIPE:
      
      return {
        ...state,
        recipes: action.recipe
      };
    default:
      return state;
  }
};

export default recipes;
