import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import checkEmail, { checkEmailSuccess } from '../../src/actions/checkEmail';
import * as types from '../../src/actions/types'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Check Email Action creator', () => {
  it('should dispatch a success action when no errors occurs', () => {
    const email = {};
    const expectedAction = {
      type: types.CHECK_EMAIL,
      email
    };
    expect(checkEmailSuccess(email)).toEqual(expectedAction);
  });

  it('should dispatch a success action when no errors occurs', () => {
    const store = mockStore({});
    axios.post = jest.fn(() => Promise.resolve({
      data: {
        message: ''
      }
    }));

    const expectedAction = [
      {
        type: types.CHECK_EMAIL,
        email: {
          message: ''
        }
      }
    ];

    return store.dispatch(checkEmail({}))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  })
})
