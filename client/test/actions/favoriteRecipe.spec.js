import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import expect from 'expect';

import favoriteRecipe, { favoriteRecipeSuccess } from '../../src/actions/favoriteRecipe';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Favorite Recipe Action Creator', () => {
  it('should dispatch a success action when no error occurs', () => {
    const favorite = { id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes' };
    const expectedAction = {
      type: types.FAVORITE_RECIPE_SUCCESS,
      favorite
    };

    expect(favoriteRecipeSuccess(favorite)).toEqual(expectedAction);
  });

  it('should dispatch a success action when no error occurs', () => {
    const store = mockStore({});
    axios.post = jest.fn(() => Promise.resolve({
      data: {
        id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes'
      }
    }));

    const expectedAction = [
      {
        type: types.FAVORITE_RECIPE_SUCCESS,
        favorite: {
          id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes'
        }
      }
    ];

    return store.dispatch(favoriteRecipe({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
  it('should dispatch a failure action when an error occurs', () => {
    const store = mockStore({});
    axios.post = jest.fn(() => Promise.reject({
      response: {
        data: {
          error: ''
        }
      }
    }));
    const expectedAction = [
      {
        type: types.FAVORITE_RECIPE_FAILURE,
        error: {
          error: ''
        }
      }
    ];

    return store.dispatch(favoriteRecipe({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    });
  });
});
