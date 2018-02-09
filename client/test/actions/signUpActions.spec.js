import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import { setCurrentUser, userSignupRequest } from '../../src/actions/signupActions';
import * as types from '../../src/actions/types';
import localStorageMock from '../__mocks__/localStorageMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsInVzZXJuYW1lIjoidGVzdGluZyIsImlhdCI6MTUxNzc0MjgwOSwiZXhwIjoxNTE3ODI5MjA5fQ.IvHzqut0GUPfhBQXanQhrLjJ3PdZwwrw5OmAdOonMkI'
window.localStorage = localStorageMock;

describe('Sign up', () => {
  it('should dispatch SET_CURRENT_USER action', () => {
    const store = mockStore({});
    axios.post = jest.fn(() => Promise.resolve({
      data:{
        id: 1,
        username: 'username',
        avatar: '',
        token
      }
    }));
    const user = {
      "exp": 1517829209,
      "iat": 1517742809,
      "id": 23,
      "username": "testing"
    }
    const expectedAction = [{
      type: types.SET_CURRENT_USER,
      user
    }]

    return store.dispatch(userSignupRequest(token))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction)
      })
  });
});
