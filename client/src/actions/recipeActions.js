import axios from 'axios';
import { ADD_RECIPE, CREATE_RECIPE_SUCCESS } from './types';
import getRecipes from './getRecipe';

const TOKEN = localStorage.getItem('jwtToken');

console.log('********', TOKEN);


const createRecipe = values => dispatch => axios.post('/api/v1/recipes', values)

  .then((response) => {
    dispatch({ type: CREATE_RECIPE_SUCCESS, payload: response.data });

    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.response);
  });

export default createRecipe;
