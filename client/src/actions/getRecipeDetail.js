import axios from 'axios';
import { GET_RECIPE_DETAIL_SUCCESS } from './types';

const getRecipeDetail = recipeId => (dispatch) => {
  console.log('am getting here');
  return axios.get(`api/v1/recipes/${recipeId}`)
    .then((response) => {
      console.log(response);
      dispatch({
        type: GET_RECIPE_DETAIL_SUCCESS,
        payload: response.data.singleRecipe,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getRecipeDetail;
