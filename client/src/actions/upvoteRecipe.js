import axios from 'axios';
import { UPVOTE_RECIPE_SUCCESS, UPVOTE_RECIPE_FAILURE } from './types';

export const upvoteRecipeSuccess = upvote => ({
  type: UPVOTE_RECIPE_SUCCESS,
  upvote,
});

export const upvoteRecipeFailure = error => ({
  type: UPVOTE_RECIPE_FAILURE,
  error,
});

const upvoteRecipe = recipeId => dispatch => axios
  .post(`/api/v1/recipes/${recipeId}/upvote`)
  .then((response) => {
    dispatch(upvoteRecipeSuccess(response.data.Recipe));
  })
  .catch((error) => {
    dispatch(upvoteRecipeFailure(error.response.data));
  });

export default upvoteRecipe;
