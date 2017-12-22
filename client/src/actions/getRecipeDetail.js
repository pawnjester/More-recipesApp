import axios from 'axios';
import { GET_RECIPE_DETAIL_SUCCESS, GET_RECIPE_DETAIL_FAILURE } from './types';

const getRecipeDetailSuccess = detail => ({
  type: GET_RECIPE_DETAIL_SUCCESS,
  detail,
});

const getRecipeDetailFailure = error => ({
  type: GET_RECIPE_DETAIL_FAILURE,
  error,
});

const getRecipeDetail = recipeId => (dispatch) => {
  console.log('am getting here');
  return axios.get(`/api/v1/recipes/${recipeId}`)
    .then((response) => {
      console.log('response is', response);
      dispatch(getRecipeDetailSuccess(response.data.singleRecipe));
    })
    .catch(() => {
      dispatch(getRecipeDetailFailure('Unable to view recipe'));
    });
};

export default getRecipeDetail;
