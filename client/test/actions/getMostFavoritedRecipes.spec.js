import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import getMostFavorites, { getMostFavoritesSuccess } from
  '../../src/actions/getMostFavoriteRecipes';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Get Most Favorited Recipes Action Creator', () => {
  it('should dispatch a success action when no error occurs', () => {
    const favorites = [{ id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes' }];
    const expectedAction = {
      type: types.GET_MOST_FAVORITED_RECIPES,
      favorites
    };

    expect(getMostFavoritesSuccess(favorites)).toEqual(expectedAction);
  });

  it('should dispatch a success action when no error occurs', () => {
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
