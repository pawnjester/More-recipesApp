import axios from 'axios';
import { FAVORITE_RECIPE_FAILURE, FAVORITE_RECIPE_SUCCESS } from './types';

const favoriteRecipeSuccess = favorite => ({
  type: FAVORITE_RECIPE_SUCCESS,
  favorite,
});

const favoriteRecipeFailure = error => ({
  type: FAVORITE_RECIPE_FAILURE,
  error,
});

const favoriteRecipe = recipeId => dispatch => axios
  .post(`/api/v1/recipes/${recipeId}/favorite`)
  .then((response) => {
    dispatch(favoriteRecipeSuccess(response.data));
  })
  .catch((err) => {
    console.log('errooooor>>>', err);
    dispatch(favoriteRecipeFailure(err.data));
  });

export default favoriteRecipe;
