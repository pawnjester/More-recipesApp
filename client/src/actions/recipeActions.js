import axios from 'axios';
import { CREATE_RECIPE_SUCCESS, CREATE_RECIPE_FAILURE } from './types';

const addRecipeSucess = newRecipe => ({
  type: CREATE_RECIPE_SUCCESS,
  newRecipe,
});

const addRecipeFailure = error => ({
  type: CREATE_RECIPE_FAILURE,
  error,
});


const createRecipe = data => dispatch => axios
  .post('/api/v1/recipes', data)
  .then((response) => {
    // const recipess = response.data.recipe;
    dispatch(addRecipeSucess(response.data.recipe));
  })
  .catch((error) => {
    console.log('error?>>', error.response.data);
    dispatch(addRecipeFailure(error.response.data.error));
  });

export default createRecipe;
