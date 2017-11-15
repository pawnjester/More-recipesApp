/* eslint-disable */

import { ADD_RECIPE, ADD_RECIPE_REJECTED } from './types';
import axios from 'axios';



  // const addRecipe = (recipe) =>  {
  //   type: 'ADD_RECIPE',
  //   payload
  // }
 

const createRecipe = (values, callback) => dispatch => {
    return axios.post('/api/v1/recipes', values)
    .then((response) => {
      console.log(response.data)
      dispatch({type: ADD_RECIPE, payload: response.data});
      callback();
    })
    .catch((error) => {
      console.log(error.response)
    })
  }

export default createRecipe;
