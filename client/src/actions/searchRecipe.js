import axios from 'axios';
import { SEARCH_RECIPE_SUCCESS, SEARCH_RECIPE_FAILURE } from './types';

const searchRecipeSuccess = search => ({
  type: SEARCH_RECIPE_SUCCESS,
  search,
});

const searchRecipeFailure = error => ({
  type: SEARCH_RECIPE_FAILURE,
  error,
});

const searchRecipe = query => dispatch => axios
  .get(`/api/v1/recipes/?search=${query}&limit=20`)
  .then((response) => {
    dispatch(searchRecipeSuccess(response.data.searchResults));
  })
  .catch(() => {
    dispatch(searchRecipeFailure());
  });

export default searchRecipe;
