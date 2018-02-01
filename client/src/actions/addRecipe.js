import axios from 'axios';
import { CREATE_RECIPE_SUCCESS, CREATE_RECIPE_FAILURE } from './types';

export const addRecipeSucess = newRecipe => ({
  type: CREATE_RECIPE_SUCCESS,
  newRecipe,
});

export const addRecipeFailure = error => ({
  type: CREATE_RECIPE_FAILURE,
  error,
});


const createRecipe = data => dispatch => axios
  .post('/api/v1/recipes', data)
  .then((response) => {
    dispatch(addRecipeSucess(response.data.recipe));
  })
  .catch((error) => {
    dispatch(addRecipeFailure(error.response.data.error));
  });

export default createRecipe;
