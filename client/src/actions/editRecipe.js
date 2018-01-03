import axios from 'axios';
import { EDIT_RECIPE_SUCCESS } from './types';

const editRecipe = recipe => dispatch => axios
  .put(`/api/v1/recipes/${recipe.id}`, recipe)
  .then((response) => {
    dispatch({ type: EDIT_RECIPE_SUCCESS, editedRecipe: response.data });
  })
  .catch((error) => {
    console.log(error.response);
  });

export default editRecipe;
