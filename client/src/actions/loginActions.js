import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utils/setAuthorizationtoken';
import { SET_CURRENT_USER } from './types';

/**
 *
 * @export
 *
 * @param {any} user
 *
 * @returns {void}
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}
/**
 *
 * @export
 *
 * @returns {void}
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

/**
 * @description this function signs in a user
 *
 * @param {any} data
 *
 * @returns {void}
 */
export function login(data) {
  return dispatch => axios.post('/api/v1/users/signin', data)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
}
