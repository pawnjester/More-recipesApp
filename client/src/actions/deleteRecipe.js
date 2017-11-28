import axios from 'axios';
import { DELETE_RECIPE_SUCCESS } from './types';

// const TOKEN = localStorage.getItem('jwtToken');

// console.log('********', TOKEN);

const deleteRecipe = recipeId => dispatch => axios
  .delete(`/api/v1/recipes/${recipeId}`)
  .then((response) => {
    console.log(response);
    dispatch({ type: DELETE_RECIPE_SUCCESS, deletedRecipe: recipeId });
  })
  .catch((error) => {
    console.log(error.response);
  });

export default deleteRecipe;
