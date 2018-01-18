import axios from 'axios';
import { GET_RECIPE_DETAIL_FAILURE, GET_REVIEW_SUCCESS } from './types';

const getReviewSuccess = review => ({
  type: GET_REVIEW_SUCCESS,
  review,
});

const getReviewFailure = error => ({
  type: GET_RECIPE_DETAIL_FAILURE,
  error,
});

const getReview = recipeId => dispatch => axios
  .get(`/api/v1/recipes/${recipeId}/reviews`)
  .then((response) => {
    dispatch(getReviewSuccess(response.data.reviews));
  })
  .catch(() => {
    dispatch(getReviewFailure('Unable to add review'));
  });

export default getReview;
