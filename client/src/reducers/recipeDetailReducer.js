import { GET_RECIPE_DETAIL_SUCCESS, UPVOTE_RECIPE_SUCCESS, DOWNVOTE_RECIPE_SUCCESS, UPVOTE_RECIPE_FAILURE, DOWNVOTE_RECIPE_FAILURE, FAVORITE_RECIPE_FAILURE, FAVORITE_RECIPE_SUCCESS, GET_FAVORITE_RECIPES_SUCCESS, GET_FAVORITE_RECIPES_FAILURE } from '../actions/types';

const initialState = {
  currentRecipe: {},
  favoriteRecipes: [],
  success: false,
  errors: null,
};

const detail = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPE_DETAIL_SUCCESS:
      return {
        ...state,
        currentRecipe: action.detail,
        success: true,
        errors: null,
      };
    case UPVOTE_RECIPE_SUCCESS:
      return {
        ...state, currentRecipe: action.upvote, success: true, errors: null,
      };

    case UPVOTE_RECIPE_FAILURE:
      return {
        ...state, currentRecipe: {}, success: false, errors: action.error,
      };

    case DOWNVOTE_RECIPE_SUCCESS:
      return {
        ...state, currentRecipe: action.downvote, success: true, errors: null,
      };

    case DOWNVOTE_RECIPE_FAILURE:
      return {
        ...state, currentRecipe: {}, success: false, errors: action.error,
      };

    case FAVORITE_RECIPE_SUCCESS:
      return {
        ...state, favoriteRecipes: action.favorite, success: true, errors: null,
      };
    
    case FAVORITE_RECIPE_FAILURE:
      return {
        ...state, favoriteRecipes: [], success: false, errors: action.error,
      };
    
    case GET_FAVORITE_RECIPES_SUCCESS:
      return {
        ...state, favoriteRecipes: action.favorite, success: true, errors: null,
      };
    
    case GET_FAVORITE_RECIPES_FAILURE:
      return {
        ...state, favoriteRecipes: [], success: false, errors: action.error,
      };
    default:
      return state;
  }
};

export default detail;
