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

const getAllRecipes = () => dispatch => axios
  .get('/api/v1/recipes')
  .then((response) => {
    dispatch(getAllRecipesSuccess(response.data.reviews));
  })
  .catch(() => {
    dispatch(getAllRecipesFailure('Unable to get recipes'));
  });

export default getAllRecipes;
