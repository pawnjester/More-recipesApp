import {
  CREATE_RECIPE_SUCCESS, CREATE_RECIPE_FAILURE,
  GET_RECIPES,
  DELETE_RECIPE_SUCCESS,
  EDIT_RECIPE_SUCCESS, SEARCH_RECIPE_SUCCESS, SEARCH_RECIPE_FAILURE, GET_PAGE_DETAIL,
} from '../actions/types';

/* eslint-disable */

const initialState = { recipes: [] , pages: 1, error: {} };

const recipes = (state = initialState, action) => {
  console.log('state -> ', state)
  switch (action.type) {
    case GET_RECIPES:
      console.log('action.recipes -> ', action.payload.recipes)
      return { ...state, recipes: action.payload.recipes || [] };
    case CREATE_RECIPE_SUCCESS:
      const newState = { ...state, recipes: [...state.recipes, action.newRecipe] };
      console.log('old state -> ', state, 'new state -> ', newState)
      return newState;
    case CREATE_RECIPE_FAILURE:
      console.log('>>>123', action.error);
      return {
        ...state, error: action.error
      }
    case DELETE_RECIPE_SUCCESS:
      const recipes = state.recipes.filter(recipe => recipe.id !== action.deletedRecipe);
      return {
        ...state,
        recipes,
      };
    case EDIT_RECIPE_SUCCESS:
      const editRecipe = state.recipes.map(recipe => ((recipe.id === action.editedRecipe.recipe.id) ? action.editedRecipe.recipe : recipe));
      return {
        ...state,
        recipes: editRecipe,
      };
    case SEARCH_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: action.search,
        error: false,
      };
    case SEARCH_RECIPE_FAILURE:
      return {
        ...state,
        recipes: action.error,
        error: true,
      };
    case GET_PAGE_DETAIL:
      return {
        ...state,
        pages: action.detail.Pages,
      }
    default:
      return state;
  }
};

export default recipes;
