import axios from 'axios';
import { UPVOTE_RECIPE_SUCCESS, UPVOTE_RECIPE_FAILURE } from './types';

const upvoteRecipeSuccess = upvote => ({
  type: UPVOTE_RECIPE_SUCCESS,
  upvote,
});

const upvoteRecipeFailure = error => ({
  type: UPVOTE_RECIPE_FAILURE,
  error,
});

const upvoteRecipe = recipeId => dispatch => axios
  .post(`/api/v1/recipes/${recipeId}/upvote`)
  .then((response) => {
    console.log('upvoteeeeed', response.data.Recipe);
    dispatch(upvoteRecipeSuccess(response.data.Recipe));
  })
  .catch((error) => {
    console.log(error);
    dispatch(upvoteRecipeFailure('Unable to upvote recipe'));
  });

export default upvoteRecipe;
