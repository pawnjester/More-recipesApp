import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthorizationtoken';
import { setCurrentUser } from './loginActions';


/**
 *
 * @description this method signs up a user
 *
 * @param {any} userData
 *
 * @returns {void}
 */
export function userSignupRequest(userData) {
  return dispatch => axios.post('/api/v1/users/signup', userData).then((res) => {
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwtDecode(token)));
  });
}
