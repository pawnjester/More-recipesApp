import axios from 'axios';
import { FAVORITE_RECIPE_FAILURE, FAVORITE_RECIPE_SUCCESS } from './types';

export const favoriteRecipeSuccess = favorite => ({
  type: FAVORITE_RECIPE_SUCCESS,
  favorite,
});

export const favoriteRecipeFailure = error => ({
  type: FAVORITE_RECIPE_FAILURE,
  error,
});

const favoriteRecipe = recipeId => dispatch => axios
  .post(`/api/v1/recipes/${recipeId}/favorite`)
  .then((response) => {
    dispatch(favoriteRecipeSuccess(response.data, recipeId));
  })
  .catch((err) => {
    dispatch(favoriteRecipeFailure(err.response.data));
  });

export default favoriteRecipe;
