import axios from 'axios';
import { EDIT_USER_DETAILS_SUCCESS, EDIT_USER_DETAILS_FAILURE } from './types';

const editUserDetailSuccess = editedUser => ({
  type: EDIT_USER_DETAILS_SUCCESS,
  editedUser,
});

const editUserDetailFailure = error => ({
  type: EDIT_USER_DETAILS_FAILURE,
  error,
});

const editUserDetail = values => dispatch => axios
  .put('/api/v1/users/update-profile', values)
  .then((response) => {
    console.log('response is', response.data);
    dispatch(editUserDetailSuccess(response.data));
  })
  .catch((error) => {
    console.log('>>>', error.response.data)
    dispatch(editUserDetailFailure(error.response.data.error));
  });

export default editUserDetail;
