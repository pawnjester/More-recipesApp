import axios from 'axios';
import { DOWNVOTE_RECIPE_SUCCESS, DOWNVOTE_RECIPE_FAILURE } from './types';

const downvoteRecipeSuccess = upvote => ({
  type: DOWNVOTE_RECIPE_SUCCESS,
  upvote,
});

const downvoteRecipeFailure = error => ({
  type: DOWNVOTE_RECIPE_FAILURE,
  error,
});

const upvoteRecipe = recipeId => dispatch => axios
  .post(`/api/v1/recipes/${recipeId}/vote?vote=downvote`)
  .then((response) => {
    console.log(response);
    dispatch(downvoteRecipeSuccess(response.data));
  })
  .catch(() => {
    dispatch(downvoteRecipeFailure('Unable to upvote recipe'));
  });

export default upvoteRecipe;
