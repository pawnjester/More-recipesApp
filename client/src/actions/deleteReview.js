import axios from 'axios';
import { DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAILURE } from './types';


export const deleteReviewSuccess = reviewId => ({
  type: DELETE_REVIEW_SUCCESS,
  deletedReview: reviewId,
});

export const deleteReviewFailure = error => ({
  type: DELETE_REVIEW_FAILURE,
  error,
});

const deleteReview = reviewId => dispatch => axios
  .delete(`/api/v1/recipes/${reviewId}/reviews`)
  .then(() => {
    dispatch(deleteReviewSuccess(reviewId));
  })
  .catch((error) => {
    dispatch(deleteReviewFailure(error.response.data));
  });

export default deleteReview;
