import axios from 'axios';
import { CREATE_RECIPE_SUCCESS } from './types';

const createRecipe = values => dispatch => axios.post('/api/v1/recipes', values)

  .then((response) => {
    dispatch({ type: CREATE_RECIPE_SUCCESS, payload: response.data });
  })
  .catch((error) => {
    console.log(error.response);
  });

export default createRecipe;
