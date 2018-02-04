import axios from 'axios';
import { DELETE_RECIPE_SUCCESS, DELETE_RECIPE_FAILURE } from './types';

export const deletedRecipeSuccess = recipeId => ({
  type: DELETE_RECIPE_SUCCESS,
  deletedRecipe: recipeId,
});

export const deletedRecipeFailure = error => ({
  type: DELETE_RECIPE_FAILURE,
  error,
});
const deleteRecipe = recipeId => dispatch => axios
  .delete(`/api/v1/recipes/${recipeId}`)
  .then(() => {
    dispatch(deletedRecipeSuccess(recipeId));
  })
  .catch((error) => {
    dispatch(deletedRecipeFailure(error.response.data));
  });
export default deleteRecipe;
