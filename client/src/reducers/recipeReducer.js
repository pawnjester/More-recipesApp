import {
  CREATE_RECIPE_SUCCESS,
  CREATE_RECIPE_FAILURE,
  GET_RECIPES,
  DELETE_RECIPE_SUCCESS,
  EDIT_RECIPE_SUCCESS,
  SEARCH_RECIPE_SUCCESS,
  SEARCH_RECIPE_FAILURE,
  GET_PAGE_DETAIL,
  GET_UPVOTED_RECIPES_SUCCESS,
  GET_MOST_FAVORITED_RECIPES,
  GET_ALL_RECIPES_SUCCESS,
  GET_ALL_RECIPES_FAILURE,
} from '../actions/types';

import initialState from '../utils/initialState';

const recipes = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        totalContent: action.payload.recipes.length,
        recipes: action.payload.recipes,
        deleted: false

      };
    case GET_ALL_RECIPES_SUCCESS:
      return {
        ...state,
        recipes: action.recipes
      };
    case GET_ALL_RECIPES_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case CREATE_RECIPE_SUCCESS:
      return {
        ...state,
        deleted: false,
        totalContent: state.recipes.length,
        recipes: [
          ...state.recipes,
          action.newRecipe
        ]
      };
    case CREATE_RECIPE_FAILURE:
      return {
        ...state,
        error: action.error,
        deleted: false
      };
    case DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        deleted: true,
        totalContent: state.recipes.length - 1,
        recipes: state.recipes
          .filter(recipe => recipe.id !== action.deletedRecipe),
      };
    case EDIT_RECIPE_SUCCESS:
      return {
        ...state,
        deleted: false,
        totalContent: state.recipes.length,
        recipes: state.recipes.map(recipe =>
          ((recipe.id === action.editedRecipe.recipe.id)
            ? action.editedRecipe.recipe : recipe)),
      };
    case SEARCH_RECIPE_SUCCESS:
      return {
        ...state,
        searchResults: action.search,
        totalContent: state.recipes.length,
        deleted: false,
      };
    case SEARCH_RECIPE_FAILURE:
      return {
        ...state,
        searchResults: action.error,
        deleted: false,
      };
    case GET_PAGE_DETAIL:
      return {
        ...state,
        totalContent: state.recipes.length,
        pages: action.detail.Pages,
        deleted: false
      };
    case GET_UPVOTED_RECIPES_SUCCESS:
      return {
        ...state,
        totalContent: state.recipes.length,
        upvotedRecipes: action.upvotedRecipes,
        deleted: false
      };
    case GET_MOST_FAVORITED_RECIPES:
      return {
        ...state,
        totalContent: state.recipes.length,
        mostFavorites: action.favorites,
        deleted: false
      };
    default:
      return state;
  }
};

export default recipes;
