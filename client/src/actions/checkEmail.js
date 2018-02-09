import axios from 'axios';
import { CHECK_EMAIL } from './types';

export const checkEmailSuccess = email => ({
  type: CHECK_EMAIL,
  email
});


const checkEmail = values => dispatch => axios.post('/api/v1/users/verify-user', values)
  .then((response) => {
    dispatch(checkEmailSuccess(response.data));
  });

export default checkEmail;
