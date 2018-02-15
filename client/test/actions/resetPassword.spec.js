import expect from 'expect';
import { resetPasswordSuccess } from '../../src/actions/resetPassword';
import * as types from '../../src/actions/types';


describe('Reset Password Action Creator', () => {
  it('should dispatch a success action when no error occurs', () => {
    const token = '';
    const expectedAction = {
      type: types.RESET_PASSWORD_SUCCESS,
      token
    };

    expect(resetPasswordSuccess(token)).toEqual(expectedAction);
  });
});
