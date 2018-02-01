import axios from 'axios';
import { EDIT_RECIPE_SUCCESS, EDIT_RECIPE_FAILURE } from './types';


export const editRecipeSuccess = editedRecipe => ({
  type: EDIT_RECIPE_SUCCESS,
  editedRecipe
});

export const editedRecipeFailure = error => ({
  type: EDIT_RECIPE_FAILURE,
  error
});

const editRecipe = recipe => dispatch => axios
  .put(`/api/v1/recipes/${recipe.id}`, recipe)
  .then((response) => {
    dispatch(editRecipeSuccess(response.data));
  })
  .catch((error) => {
    dispatch(editedRecipeFailure(error.response.data));
  });

export default editRecipe;
