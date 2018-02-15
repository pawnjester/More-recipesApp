import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import expect from 'expect';

import getUserDetail, { getUserDetailSuccess } from
  '../../src/actions/getUserDetail';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Get User Detail Action Creator', () => {
  it('should dispatch a success action when no error occurs', () => {
    const user = { id: '2', username: 'looo', email: 'looo@example.com' };
    const expectedAction = {
      type: types.GET_USER_DETAILS_SUCCESS,
      user
    };

    expect(getUserDetailSuccess(user)).toEqual(expectedAction);
  });

  it('should dispatch a success action when no error occurs', () => {
    const store = mockStore({});
    axios.get = jest.fn(() => Promise.resolve({
      data: {
        id: '2', username: 'looo', email: 'looo@example.com'
      }
    }));

    const expectedAction = [
      {
        type: types.GET_USER_DETAILS_SUCCESS,
        user: { id: '2', username: 'looo', email: 'looo@example.com' }
      }
    ];

    return store.dispatch(getUserDetail({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });

  it('should dispatch a failure action when an error occurs', () => {
    const store = mockStore({});
    axios.get = jest.fn(() => Promise.reject({
      response: {
        data: {
          error: ''
        }
      }
    }));
    const expectedAction = [
      {
        type: types.GET_USER_DETAILS_FAILURE,
        error: 'Unable to retrieve this User'
      }
    ];

    return store.dispatch(getUserDetail({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    });
  });
});
