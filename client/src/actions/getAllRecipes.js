import axios from 'axios';
import { GET_ALL_RECIPES_SUCCESS, GET_ALL_RECIPES_FAILURE } from './types';


const getAllRecipesSuccess = recipes => ({
  type: GET_ALL_RECIPES_SUCCESS,
  recipes,
});

const getAllRecipesFailure = error => ({
  type: GET_ALL_RECIPES_FAILURE,
  error,
});

const getAllRecipes = page => dispatch => axios
  .get(`/api/v1/recipes?page=${page || 1}`)
  .then((response) => {
    dispatch(getAllRecipesSuccess(response.data));
  })
  .catch((error) => {
    dispatch(getAllRecipesFailure(error.response.data));
  });

export default getAllRecipes;
