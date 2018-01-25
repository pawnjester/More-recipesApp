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
  GET_MOST_FAVORITED_RECIPES
} from '../actions/types';


const initialState = {
  recipes: [], upvotedRecipes: [], mostFavorites: {}, pages: 1, error: {}
};

const recipes = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return { ...state, recipes: action.payload.recipes };
    case CREATE_RECIPE_SUCCESS:
      return { ...state, recipes: [...state.recipes, action.newRecipe] };
    case CREATE_RECIPE_FAILURE:
      return {
        ...state, error: action.error
      };
    case DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe.id !== action.deletedRecipe),
      };
    case EDIT_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: state.recipes.map(recipe => ((recipe.id === action.editedRecipe.recipe.id) ? action.editedRecipe.recipe : recipe)),
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
      };
    case GET_UPVOTED_RECIPES_SUCCESS:
      return {
        ...state,
        upvotedRecipes: action.upvotedRecipes
      };
    case GET_MOST_FAVORITED_RECIPES:
      return {
        ...state,
        mostFavorites: action.favorites
      };
    default:
      return state;
  }
};

export default recipes;
