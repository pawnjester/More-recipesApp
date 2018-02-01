import axios from 'axios';
import { GET_USER_DETAILS_SUCCESS, GET_FAVORITE_RECIPES_FAILURE } from './types';

export const getUserDetailSuccess = user => ({
  type: GET_USER_DETAILS_SUCCESS,
  user,
});

export const getUserDetailFailure = error => ({
  type: GET_FAVORITE_RECIPES_FAILURE,
  error,
});

const getUserDetail = () => (dispatch) => {
  return axios.get('/api/v1/users/me')
    .then((response) => {
      dispatch(getUserDetailSuccess(response.data));
    })
    .catch(() => {
      dispatch(getUserDetailFailure('Unable to retrieve this User'));
    });
};

export default getUserDetail;
