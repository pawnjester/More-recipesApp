import axios from 'axios';
import { GET_RECIPES } from './types';

const getRecipe = values => dispatch => axios.get('/api/v1/recipes', values)
  .then((response) => {
    dispatch({ type: GET_RECIPES, payload: response.data });
  })
  .catch((error) => {
    console.log(error.response);
  });

export default getRecipe;
