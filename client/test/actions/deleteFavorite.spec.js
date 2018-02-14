import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import deletedFavorite, { deletedFavoriteSuccess } from '../../src/actions/deleteFavorite';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Delete Favorite Action Creator', () => {
  it('should dispatch a success action when no errors occurs', () => {
    const deletedFavorite = { id: 1 };
    const expectedAction = {
      type: types.DELETE_FAVORITE_SUCCESS,
      deletedFavorite
    };

    expect(deletedFavoriteSuccess(deletedFavorite)).toEqual(expectedAction);
  });

  it('should dispatch a success action when no errors occurs', () => {
    const store = mockStore({});
    axios.delete = jest.fn(() => Promise.resolve({
    }));

    const expectedAction = [
      {
        type: types.DELETE_FAVORITE_SUCCESS,
        deletedFavorite: {}
      }
    ];

    return store.dispatch(deletedFavorite({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
  it('should dispatch a failure action when an error occurs', () => {
    const store = mockStore({});
    axios.delete = jest.fn(() => Promise.reject({
      response: {
        data: {
          error: ''
        }
      }
    }));
    const expectedAction = [
      {
        type: types.DELETE_FAVORITE_FAILURE,
        error: {
          error: ''
        }
      }
    ];

    return store.dispatch(deletedFavorite({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    });
  });
});
