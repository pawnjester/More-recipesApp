import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import deletedFavorite, { deletedFavoriteSuccess } from '../../src/actions/deleteFavorite';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('deleteFavoriteAction', () => {
  it('delete recipe success action', () => {
    const deletedFavorite = { id: 1 };
    const expectedAction = {
      type: types.DELETE_FAVORITE_SUCCESS,
      deletedFavorite
    };

    expect(deletedFavoriteSuccess(deletedFavorite)).toEqual(expectedAction);
  });

  it('delete favorite recipe action creator', () => {
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
});
