import axios from 'axios';
import { GET_UPVOTED_RECIPES_FAILURE, GET_UPVOTED_RECIPES_SUCCESS } from './types';


export const getUpvotedRecipesSuccess = upvotedRecipes => ({
  type: GET_UPVOTED_RECIPES_SUCCESS,
  upvotedRecipes,
});

export const getUpvotedRecipesFailure = error => ({
  type: GET_UPVOTED_RECIPES_FAILURE,
  error,
});

const getUpvotedRecipes = () => dispatch => axios
  .get('/api/v1/recipes?sort=upVotes&order=desc')
  .then((response) => {
    dispatch(getUpvotedRecipesSuccess(response.data.recipe));
  })
  .catch((error) => {
    dispatch(getUpvotedRecipesFailure(error.response.data));
  });

export default getUpvotedRecipes;
