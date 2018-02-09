import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import fetchMock from 'fetch-mock';

import getMostFavorites, { getMostFavoritesSuccess, getMostFavoritesFailure } from
  '../../src/actions/getMostFavoriteRecipes';
import * as types from '../../src/actions/types';
import getMostFavoriteRecipes from '../../src/actions/getMostFavoriteRecipes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getMostFavoritedRecipesAction', () => {
  it('get most favorited recipes success action', () => {
    const favorites = [{ id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes' }];
    const expectedAction = {
      type: types.GET_MOST_FAVORITED_RECIPES,
      favorites
    };

    expect(getMostFavoritesSuccess(favorites)).toEqual(expectedAction);
  });

  it('get most favorited recipes action creator', () => {
    const store = mockStore({});
    axios.get = jest.fn(() => Promise.resolve({
      data: {
        id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes'
      }
    }));

    const expectedAction = [
      {
        type: types.GET_MOST_FAVORITED_RECIPES,
        favorites: { id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes' }
      }
    ];

    return store.dispatch(getMostFavorites({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });

  it('should handle error', () => {
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
        type: types.GET_MOST_FAVORITED_RECIPES_FAILURE,
        error: {
          error: ''
        }
      }
    ];

    return store.dispatch(getMostFavorites({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    });
  });
});
