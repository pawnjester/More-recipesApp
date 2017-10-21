import axios from 'axios';


export function login(userData) {
  return dispatch => {
    return  axios.post('/api/v1/users/signin', userData );
  };
}
