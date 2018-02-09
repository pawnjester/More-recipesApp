import axios from 'axios';
import { CHECK_EMAIL } from './types';

export const checkEmailSuccess = email => ({
  type: CHECK_EMAIL,
  email
});

// export const checkEmail = email => dispatch => axios
//   .post('/api/v1/users/verify-user', email);

const checkEmail = values => dispatch => axios.post('/api/v1/users/verify-user', values)
  .then((response) => {
    console.log('>>>', response.data);
    dispatch(checkEmailSuccess(response.data));
  });

export default checkEmail;
