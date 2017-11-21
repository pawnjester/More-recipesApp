import { GET_RECIPES } from './types';
import axios from 'axios';

const getRecipe = (values) => dispatch => {
    return axios.get('/api/v1/recipes', values)
    .then((response) => {
        dispatch({type: GET_RECIPES, payload: response.data});
    })
    .catch((error) =>{
        console.log(error.response)        
    })
}

export default getRecipe;