import axios from 'axios';
import { DELETE_RECIPE_SUCCESS } from './types';
const TOKEN = localStorage.getItem('jwtToken');

console.log('********', TOKEN);

const deleteRecipe = (recipeId) => dispatch => {
    return axios
    .delete(`/api/v1/recipes/${recipeId}`)
    .then((response) => {
        console.log(response)        
        dispatch({type: DELETE_RECIPE_SUCCESS, deletedRecipe: recipeId})
        console.log('**********',response)
    })
    .catch((error) => {
        console.log(error.response)
    })
}

export default deleteRecipe
