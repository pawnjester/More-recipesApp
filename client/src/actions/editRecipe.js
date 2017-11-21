import axios from 'axios';
import { EDIT_RECIPE_SUCCESS } from './types';

const editRecipe = (recipeId) => dispatch => {
    return axios
    .put(`/api/v1/recipes/${recipeId}`)
    .then((response) => {
        console.log(response)
        dispatch({ type: EDIT_RECIPE_SUCCESS, editedRecipe: recipeId})
        console.log('*********', response)
    })
    .catch((error) => {
        console.log(error.response)
    })
}

export default editRecipe;