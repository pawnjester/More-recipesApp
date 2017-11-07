/* eslint-disable */

import { RECIPE } from './types'

export function createRecipe(recipe) {
  // return dispatch => {
  //   return axios.post('/api/v1/recipes', recipe)
  // }

  const action =  {
    //unique identifier
    type: 'ADD_RECIPE',
    //Payload
    recipe
        
  }
  return action;
}

export function deleteRecipe(recipeId) {
  const action ={
    type: 'DELETE_RECIPE',
    recipeId
  }

  return action;
}