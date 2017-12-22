import axios from 'axios';
import { ADD_REVIEW, ADD_REVIEW_FAILURE } from './types';

const addReviewToRecipeSuccess = review => ({
  type: ADD_REVIEW,
  review,
});

const addReviewToRecipeFailure = error => ({
  type: ADD_REVIEW_FAILURE,
  error,
});

const addReview = (recipeId, data) => dispatch => axios
  .post(`/api/v1/recipes/${recipeId}/reviews`, data)
  .then((response) => {
    dispatch(addReviewToRecipeSuccess(response.data.reviewed));
  })
  .catch(() => {
    dispatch(addReviewToRecipeFailure('Unable to add review'));
  });

export default addReview;
