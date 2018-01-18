import axios from 'axios';
import { GET_FAVORITE_RECIPES_SUCCESS, GET_RECIPE_DETAIL_SUCCESS } from './types';


const getFavoriteRecipeSuccess = favorite => ({
  type: GET_FAVORITE_RECIPES_SUCCESS,
  favorite,
});

const getFavoriteRecipeFailure = error => ({
  type: GET_RECIPE_DETAIL_SUCCESS,
  error,
});


const getFavoriteRecipe = userId => dispatch => axios
  .get(`/api/v1/recipes/${userId}/favorite`)
  .then((response) => {
    dispatch(getFavoriteRecipeSuccess(response.data.userFavorite));
  })
  .catch((err) => {
    dispatch(getFavoriteRecipeFailure(err.data));
  });

export default getFavoriteRecipe;
