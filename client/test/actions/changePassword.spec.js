import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import expect from 'expect';

import changePassword, { changePasswordSuccess }
  from '../../src/actions/changePassword';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Change Password Action Creator', () => {
  it('should dispatch a success action when a password is given', () => {
    const password = {};
    const expectedAction = {
      type: types.CHANGE_PASSWORD,
      password
    };
    expect(changePasswordSuccess(password)).toEqual(expectedAction);
  });

  it('should dispatch a success action when a password is given', () => {
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

  it('should dispatch an failure action when an error occurs', () => {
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
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
