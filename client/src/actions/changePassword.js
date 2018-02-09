import axios from 'axios';
import { CHANGE_PASSWORD, CHANGE_PASSWORD_FAILURE } from './types';

export const changePasswordSuccess = password => ({
  type: CHANGE_PASSWORD,
  password
});

export const changePasswordFailure = error => ({
  type: CHANGE_PASSWORD_FAILURE,
  error
});


const changePassword = values => dispatch => axios.put('/api/v1/users/change-password', values)
  .then((response) => {
    dispatch(changePasswordSuccess(response.data));
  })
  .catch((err) => {
    dispatch(changePasswordFailure(err.response.data));
  });
export default changePassword;
