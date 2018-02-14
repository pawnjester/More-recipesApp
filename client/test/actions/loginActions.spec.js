import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import { setCurrentUser, login, logout } from '../../src/actions/loginActions';
import * as types from '../../src/actions/types';
import localStorageMock from '../__mocks__/localStorageMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsInVzZXJuYW1lIjoidGVzdGluZyIsImlhdCI6MTUxNzc0MjgwOSwiZXhwIjoxNTE3ODI5MjA5fQ.IvHzqut0GUPfhBQXanQhrLjJ3PdZwwrw5OmAdOonMkI'
window.localStorage = localStorageMock;

describe('Sign in Action creator', () => {
  it('should create an action for sign in user', () => {
    const user = {
      id: 1,
      username: 'username',
      profileImg: '',
      token
    };
    const expectedAction = {
      type: types.SET_CURRENT_USER,
      user
    }
    expect(setCurrentUser(user)).toEqual(expectedAction);
  });
  it('should dispatch SET_CURRENT_USER action', () => {
    const store = mockStore({});
    axios.post = jest.fn(() => Promise.resolve({
      data:{
        id: 1,
        username: 'username',
        profileImg: '',
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

    return store.dispatch(login(token))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction)
      })
  });

  it('should dispatch logout action', () => {
    const store = mockStore({});

    const expectedAction = [
      {
        type: types.SET_CURRENT_USER,
        user: {}
      }
    ]
    store.dispatch(logout());
    expect(store.getActions()).toEqual(expectedAction);

  })

})
