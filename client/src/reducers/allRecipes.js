import { GET_ALL_RECIPES_SUCCESS, GET_ALL_RECIPES_FAILURE, SEARCH_RECIPE_FAILURE, SEARCH_RECIPE_SUCCESS} from '../actions/types';

const initialState = {
  foundRecipes : [],
  success: false,
  errors: null,
};
