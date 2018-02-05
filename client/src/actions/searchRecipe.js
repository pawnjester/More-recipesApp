import axios from 'axios';
import { SEARCH_RECIPE_SUCCESS, SEARCH_RECIPE_FAILURE } from './types';

export const searchRecipeSuccess = search => ({
  type: SEARCH_RECIPE_SUCCESS,
  search,
});

export const searchRecipeFailure = error => ({
  type: SEARCH_RECIPE_FAILURE,
  error,
});

const searchRecipe = query => dispatch => axios
  .get(`/api/v1/recipes/?search=${query}&limit=30`)
  .then((response) => {
    dispatch(searchRecipeSuccess(response.data.searchResults));
  })
  .catch((error) => {
    dispatch(searchRecipeFailure(error.response.data.searchResults));
  });

export default searchRecipe;
