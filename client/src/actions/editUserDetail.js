import axios from 'axios';
import { EDIT_USER_DETAILS_SUCCESS, EDIT_USER_DETAILS_FAILURE } from './types';

export const editUserDetailSuccess = editedUser => ({
  type: EDIT_USER_DETAILS_SUCCESS,
  editedUser,
});

export const editUserDetailFailure = error => ({
  type: EDIT_USER_DETAILS_FAILURE,
  error,
});

const editUserDetail = values => dispatch => axios
  .put('/api/v1/users/update-profile', values)
  .then((response) => {
    dispatch(editUserDetailSuccess(response.data));
  })
  .catch((error) => {
    dispatch(editUserDetailFailure(error.response.data.error));
  });

export default editUserDetail;
