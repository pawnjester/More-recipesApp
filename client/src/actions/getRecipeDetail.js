import axios from 'axios';
import { GET_RECIPE_DETAIL_SUCCESS, GET_RECIPE_DETAIL_FAILURE } from './types';
import history from '../utils/history';

export const getRecipeDetailSuccess = detail => ({
  type: GET_RECIPE_DETAIL_SUCCESS,
  detail,
});

export const getRecipeDetailFailure = error => ({
  type: GET_RECIPE_DETAIL_FAILURE,
  error,
});

const getRecipeDetail = recipeId => dispatch => axios
  .get(`/api/v1/recipes/${recipeId}`)
  .then((response) => {
    dispatch(getRecipeDetailSuccess(response.data.singleRecipe));
  })
  .catch((error) => {
    if (error.response.status === 404) {
      history.push('/*');
    }
    dispatch(getRecipeDetailFailure(error.response.data.error));
  });

export default getRecipeDetail;
