import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import deleteRecipe, { deletedRecipeSuccess } from '../../src/actions/deleteRecipe';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Delete Recipe Action Creator', () => {
  it('should dispatch a success action when no error occurs', () => {
    const deletedRecipe = { id: 1 };
    const expectedAction = {
      type: types.DELETE_RECIPE_SUCCESS,
      deletedRecipe
    };

    expect(deletedRecipeSuccess(deletedRecipe)).toEqual(expectedAction);
  });

  it('should dispatch a success action when no error occurs', () => {
    const store = mockStore({});
    axios.delete = jest.fn(() => Promise.resolve({
    }));

    const expectedAction = [
      {
        type: types.DELETE_RECIPE_SUCCESS,
        deletedRecipe: {}
      }
    ];

    return store.dispatch(deleteRecipe({}))
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
        type: types.DELETE_RECIPE_FAILURE,
        error: {
          error: ''
        }
      }
    ];

    return store.dispatch(deleteRecipe({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    });
  });
});
