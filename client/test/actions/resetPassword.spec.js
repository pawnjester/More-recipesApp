import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import resetPassword, { resetPasswordSuccess } from '../../src/actions/resetPassword';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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
