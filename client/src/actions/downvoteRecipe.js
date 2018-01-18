import axios from 'axios';
import { DOWNVOTE_RECIPE_SUCCESS, DOWNVOTE_RECIPE_FAILURE } from './types';

const downvoteRecipeSuccess = downvote => ({
  type: DOWNVOTE_RECIPE_SUCCESS,
  downvote,
});

const downvoteRecipeFailure = error => ({
  type: DOWNVOTE_RECIPE_FAILURE,
  error,
});

const downvoteRecipe = recipeId => dispatch => axios
  .post(`/api/v1/recipes/${recipeId}/downvote`)
  .then((response) => {
    dispatch(downvoteRecipeSuccess(response.data.Recipe));
  })
  .catch(() => {
    dispatch(downvoteRecipeFailure('Unable to upvote recipe'));
  });

export default downvoteRecipe;
