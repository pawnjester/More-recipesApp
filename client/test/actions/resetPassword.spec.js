import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import resetPassword, { resetPasswordSuccess } from '../../src/actions/resetPassword';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('reset Password', () => {
  it('reset user password', () => {
    const token = '';
    const expectedAction = {
      type: types.RESET_PASSWORD_SUCCESS,
      token
    };

    expect(resetPasswordSuccess(token)).toEqual(expectedAction);
  });
  // it('should handle error', () => {
  //   const store = mockStore({});
  //   axios.put = jest.fn(() => Promise.reject(
  //     response: {
  //       data: {
  //         error: ''
  //       }
  //     }
  //   ));
  //   const expectedAction = [
  //     {
  //       type: types.RESET_PASSWORD_FAILURE,
  //       error: ''
  //     }
  //   ];

  //   return store.dispatch(resetPassword('ososos', 'password', 'password')).then(() => {
  //     expect(store.getActions()).toEqual(expectedAction)
  //   });
  // });
});
