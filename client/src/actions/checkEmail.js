import axios from 'axios';


const checkEmail = email => dispatch => axios
  .post('/api/v1/users/verify-user', email);

export default checkEmail;
