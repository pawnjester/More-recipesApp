/* eslint-disable */

import axios from 'axios';

export function createRecipe(recipe) {
  return dispatch => {
    return axios.post('/api/v1/recipes', recipe)
  }
}