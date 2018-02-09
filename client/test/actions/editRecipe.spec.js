import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import editRecipe, { editRecipeSuccess } from '../../src/actions/editRecipe';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('editRecipeAction', () => {
  it('edit recipe success action', () => {
    const editedRecipe = { id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes' };
    const expectedAction = {
      type: types.EDIT_RECIPE_SUCCESS,
      editedRecipe
    };

    expect(editRecipeSuccess(editedRecipe)).toEqual(expectedAction);
  });

  it('edit recipe action creator', () => {
    const store = mockStore({});
    axios.put = jest.fn(() => Promise.resolve({
      data: {
        id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes'
      }
    }));

    const expectedAction = [
      {
        type: types.EDIT_RECIPE_SUCCESS,
        editedRecipe: { //what the action returns
          id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes'
        }
      }
    ];

    return store.dispatch(editRecipe({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
  it('should handle error', () => {
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
