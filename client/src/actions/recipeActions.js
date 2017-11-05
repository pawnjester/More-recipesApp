/* eslint-disable */

import { RECIPE } from './types'

export function createRecipe(recipe) {
  // return dispatch => {
  //   return axios.post('/api/v1/recipes', recipe)
  // }

  const action =  {
    //unique identifier
    type: 'RECIPE',
    //Payload
    recipe
        
  }
  return action;
}