import axios from 'axios';
import { RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from './types';

export const resetPasswordSuccess = token => ({
  type: RESET_PASSWORD_SUCCESS,
  token,
});
export const resetPasswordFailure = error => ({
  type: RESET_PASSWORD_FAILURE,
  error,
});

const resetPassword = (token, password, passwordConfirmation) => dispatch =>
  axios({
    method: 'put',
    url: '/api/v1/users/reset-password',
    headers: {
      'x-access-token': token
    },
    data: {
      password,
      passwordConfirmation
    },

  })
    .then((response) => {
      dispatch(resetPasswordSuccess(response.data));
    })
    .catch((err) => {
      dispatch(resetPasswordFailure(err.data));
    });

export default resetPassword;
