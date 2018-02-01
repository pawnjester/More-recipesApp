import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import resetPassword, { resetPasswordSuccess } from '../../src/actions/resetPassword';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('reset Password', () => {
  it('reset user password', () => {
    const token = 'eyhdjhdsjhjhsdjhds.dskjdsjkjkdsjkjds.dskjdskjdskjdkjdsjk';
    const expectedAction = {
      type: types.RESET_PASSWORD_SUCCESS,
      token
    };

    expect(resetPasswordSuccess(token)).toEqual(expectedAction);
  });

  // it('reset password action creator', () => {
  //   const store = mockStore({});
  //   axios.put = jest.fn(() => Promise.resolve({
  //     data: {
  //       token: 'eyhdjhdsjhjhsdjhds.dskjdsjkjkdsjkjds.dskjdskjdskjdkjdsjk',
  //       password: 'charther001',
  //       passwordConfirmation: 'charther001'
  //     }
  //   }));

  //   const expectedAction = [
  //     {
  //       type: types.RESET_PASSWORD_SUCCESS,
  //       token: 'eyhdjhdsjhjhsdjhds.dskjdsjkjkdsjkjds.dskjdskjdskjdkjdsjk',
  //       password: 'charther001',
  //       passwordConfirmation: 'charther001'
  //     }
  //   ];

  //   return store.dispatch(resetPassword({}))
  //     .then(() => {
  //       expect(store.getActions()).toEqual(expectedAction);
  //     });
  // });
});
