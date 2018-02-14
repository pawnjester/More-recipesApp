import axios from 'axios';
import { GET_FAVORITE_RECIPES_SUCCESS, GET_FAVORITE_RECIPES_FAILURE } from './types';

export const getFavoriteRecipeSuccess = favorite => ({
  type: GET_FAVORITE_RECIPES_SUCCESS,
  favorite,
});

export const getFavoriteRecipeFailure = error => ({
  type: GET_FAVORITE_RECIPES_FAILURE,
  error,
});


const getFavoriteRecipe = page => dispatch => axios
  .get(`/api/v1/recipes/favorite?page=${page || 1}`)
  .then((response) => {
    dispatch(getFavoriteRecipeSuccess(response.data));
  })
  .catch((err) => {
    dispatch(getFavoriteRecipeFailure(err.response.data));
  });

export default getFavoriteRecipe;
