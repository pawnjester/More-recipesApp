import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import editUserDetail, { editUserDetailSuccess } from '../../src/actions/editUserDetail';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('editUserAction', () => {
  it('edit user success action', () => {
    const editedUser = { id: '2', username: 'farmhouse' };
    const expectedAction = {
      type: types.EDIT_USER_DETAILS_SUCCESS,
      editedUser
    };

    expect(editUserDetailSuccess(editedUser)).toEqual(expectedAction);
  });

  it('edit user detail action creator', () => {
    const store = mockStore({});
    axios.put = jest.fn(() => Promise.resolve({
      data: {
        userFound: {
          id: '2', username: 'farmhouse'
        }
      }
    }));

    const expectedAction = [
      {
        type: types.EDIT_USER_DETAILS_SUCCESS,
        editedUser: { // what the action returns
          userFound: {
            id: '2', username: 'farmhouse'
          }
        }
      }
    ];

    return store.dispatch(editUserDetail({}))
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
        type: types.EDIT_USER_DETAILS_FAILURE,
        error: ''
      }
    ];

    return store.dispatch(editUserDetail({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    });
  });
});
