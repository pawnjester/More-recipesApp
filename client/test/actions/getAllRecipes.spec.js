import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import getAllRecipes, { getAllRecipesSuccess } from
  '../../src/actions/getAllRecipes';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getAllRecipeAction', () => {
  it('get all recipe success action', () => {
    const recipes = [{ id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes' }];
    const expectedAction = {
      type: types.GET_ALL_RECIPES_SUCCESS,
      recipes
    };

    expect(getAllRecipesSuccess(recipes)).toEqual(expectedAction);
  });

  it('get all recipes action creator', () => {
    const store = mockStore({});
    axios.get = jest.fn(() => Promise.resolve({
      data: {
        id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes'
      }
    }));

    const expectedAction = [
      {
        type: types.GET_ALL_RECIPES_SUCCESS,
        recipes: { id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes' }
      }
    ];

    return store.dispatch(getAllRecipes({}))
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
        type: types.GET_ALL_RECIPES_FAILURE,
        error: {
          error: ''
        }
      }
    ];

    return store.dispatch(getAllRecipes({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    });
  });
});
