import axios from 'axios';



const checkEmail = values => dispatch =>
  axios.post('/api/v1/users/verify-user', values)
    .then((response) => {
      dispatch(checkEmailSuccess(response.data));
    });

export default checkEmail;
