import axios from 'axios';
import { CHANGE_PASSWORD } from './types';

const changePasswordSucess = () => ({
  type: CHANGE_PASSWORD
});



const changePassword = ({oldPassword, password }) => dispatch => axios
  .put('/api/v1/users/change-password', {oldPassword, password });
  // .then((response) => {
  //   console.log('changepassord>>', response.dat)
  //   dispatch(changePasswordSucess(response.data));
  // })
  // .catch((error) => {
  //   console.log(error)
  // })

export default changePassword;
