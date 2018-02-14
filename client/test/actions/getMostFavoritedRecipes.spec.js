import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import getMostFavorites, { getMostFavoritesSuccess } from
  '../../src/actions/getMostFavoriteRecipes';
import * as types from '../../src/actions/types';

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
});
