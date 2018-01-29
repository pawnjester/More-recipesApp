import axios from 'axios';
import { EDIT_RECIPE_SUCCESS, EDIT_RECIPE_FAILURE } from './types';

const editRecipe = recipe => dispatch => axios
  .put(`/api/v1/recipes/${recipe.id}`, recipe)
  .then((response) => {
    dispatch({ type: EDIT_RECIPE_SUCCESS, editedRecipe: response.data });
  })
  .catch((error) => {
    dispatch({ type: EDIT_RECIPE_FAILURE, error: error.response.data });
  });

export default editRecipe;
