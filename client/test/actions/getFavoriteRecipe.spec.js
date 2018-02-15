import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import expect from 'expect';

import getFavoriteRecipe, { getFavoriteRecipeSuccess } from
  '../../src/actions/getFavoriteRecipes';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Get Favorited Recipes Action Creator', () => {
  it('should dispatch a success action when no error occurs', () => {
    const favorite = [{ id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes' }];
    const expectedAction = {
      type: types.GET_FAVORITE_RECIPES_SUCCESS,
      favorite
    };

    expect(getFavoriteRecipeSuccess(favorite)).toEqual(expectedAction);
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
        type: types.GET_FAVORITE_RECIPES_SUCCESS,
        favorite: { id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes' }
      }
    ];

    return store.dispatch(getFavoriteRecipe({}))
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
        type: types.GET_FAVORITE_RECIPES_FAILURE,
        error: {
          error: ''
        }
      }
    ];

    return store.dispatch(getFavoriteRecipe({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    });
  });
});
