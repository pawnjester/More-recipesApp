import axios from 'axios';
import { GET_USER_DETAILS_SUCCESS, GET_FAVORITE_RECIPES_FAILURE } from './types';

const getUserDetailSuccess = user => ({
  type: GET_USER_DETAILS_SUCCESS,
  user,
});

const getUserDetailFailure = error => ({
  type: GET_FAVORITE_RECIPES_FAILURE,
  error,
});

const getUserDetail = () => (dispatch) => {
  return axios.get('/api/v1/users/me')
    .then((response) => {
      console.log('userDetails', response.data);
      dispatch(getUserDetailSuccess(response.data));
    })
    .catch(() => {
      dispatch(getUserDetailFailure('Unable to retrieve this User'));
    });
};

export default getUserDetail;
