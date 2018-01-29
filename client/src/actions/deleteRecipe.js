import axios from 'axios';
import { DELETE_RECIPE_SUCCESS, DELETE_RECIPE_FAILURE } from './types';

const deleteRecipe = recipeId => dispatch => axios
  .delete(`/api/v1/recipes/${recipeId}`)
  .then((response) => {
    dispatch({ type: DELETE_RECIPE_SUCCESS, deletedRecipe: recipeId });
  })
  .catch((error) => {
    dispatch({ type: DELETE_RECIPE_FAILURE, error: error.response.data });
  });

export default deleteRecipe;
