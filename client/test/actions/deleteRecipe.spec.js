import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import deleteRecipe, { deletedRecipeSuccess } from '../../src/actions/deleteRecipe';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('deleteRecipeAction', () => {
  it('delete recipe success action', () => {
    const deletedRecipe = { id: 1 };
    const expectedAction = {
      type: types.DELETE_RECIPE_SUCCESS,
      deletedRecipe
    };

    expect(deletedRecipeSuccess(deletedRecipe)).toEqual(expectedAction);
  });

  it('delete recipe action creator', () => {
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
});
