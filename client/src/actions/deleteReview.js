import axios from 'axios';
import { DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAILURE } from './types';


// const deleteReviewSuccess = deletedReview => ({
//   type: DELETE_REVIEW_SUCCESS,
//   deletedReview,
// });

const deleteReviewFailure = error => ({
  type: DELETE_REVIEW_FAILURE,
  error,
});

const deleteReview = reviewId => dispatch => axios
  .delete(`/api/v1/recipes/${reviewId}/reviews`)
  .then(() => {
    dispatch({ type: DELETE_REVIEW_SUCCESS, deletedReview: reviewId });
  })
  .catch(() => {
    dispatch(deleteReviewFailure('Unable to upvote recipe'));
  });

export default deleteReview;
