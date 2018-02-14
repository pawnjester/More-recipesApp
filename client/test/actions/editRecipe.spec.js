import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import editRecipe, { editRecipeSuccess } from '../../src/actions/editRecipe';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Edit Recipe Action Creator', () => {
  it('should dispatch a success action when no error occurs', () => {
    const editedRecipe = { id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes' };
    const expectedAction = {
      type: types.EDIT_RECIPE_SUCCESS,
      editedRecipe
    };

    expect(editRecipeSuccess(editedRecipe)).toEqual(expectedAction);
  });

  it('should dispatch a success action when no error occurs', () => {
    const store = mockStore({});
    axios.put = jest.fn(() => Promise.resolve({
      data: {
        id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes'
      }
    }));

    const expectedAction = [
      {
        type: types.EDIT_RECIPE_SUCCESS,
        editedRecipe: {
          id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes'
        }
      }
    ];

    return store.dispatch(editRecipe({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
  it('should dispatch a failure action when an error occurs', () => {
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
        type: types.EDIT_RECIPE_FAILURE,
        error: {
          error: ''
        }
      }
    ];

    return store.dispatch(editRecipe({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    });
  });
});
