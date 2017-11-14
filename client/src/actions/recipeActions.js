/* eslint-disable */

import { ADD_RECIPE, ADD_RECIPE_REJECTED } from './types';
import axios from 'axios';



  const addRecipe = (recipe) =>  {
    type: 'ADD_RECIPE',
    recipe
  }
 

export const createRecipe = (name, ingredients, method) => dispatch => {
    return axios.post('/api/v1/recipes', {
      name,
      ingredients,
      method
    })
    .then((response) => {
      dispatch(addRecipe(response.data));
    })
    .catch((error) => {

    })
  }
