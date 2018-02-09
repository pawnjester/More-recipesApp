import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import changePassword, { changePasswordSuccess } from '../../src/actions/changePassword'
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('changePasswordAction', () => {
  it('change Password action', () => {
    const password = {};
    const expectedAction = {
      type: types.CHANGE_PASSWORD,
      password
    };
    expect(changePasswordSuccess(password)).toEqual(expectedAction);
  });

  it('change password', () => {
    const store = mockStore({});
    axios.put = jest.fn(() => Promise.resolve({
      data: {
        message: ''
      }
    }));

    const expectedAction = [
      {
        type: types.CHANGE_PASSWORD,
        password: {
          message: ''
        }
      }
    ];

    return store.dispatch(changePassword({}))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('should handle error', () => {
    const store = mockStore({});
    axios.put = jest.fn(() => Promise.reject({
      response: {
        data: {
          error: ''
        }
      }
    }));
    const expectedAction = [
      {
        type: types.CHANGE_PASSWORD_FAILURE,
        error: {
          error: ''
        }
      }
    ];

    return store.dispatch(changePassword({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    });
  });
})
