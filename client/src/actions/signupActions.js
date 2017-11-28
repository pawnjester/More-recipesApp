import axios from 'axios';


export function userSignupRequest(userData) {
  return dispatch => axios.post('/api/v1/users/signup', userData);
}
