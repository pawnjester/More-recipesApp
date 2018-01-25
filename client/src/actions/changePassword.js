import axios from 'axios';


const changePassword = ({ oldPassword, password }) => dispatch => axios
  .put('/api/v1/users/change-password', { oldPassword, password });

export default changePassword;
