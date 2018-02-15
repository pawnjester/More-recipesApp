import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import expect from 'expect';

import createRecipe, { addRecipeSucess } from '../../src/actions/addRecipe';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('add Recipe action creator', () => {
  it('should dispatch a success action when dispatched with valid details', () => {
    const newRecipe = { id: 1, name: 'butter', imageUrl: '' };
    const expectedAction = {
      type: types.CREATE_RECIPE_SUCCESS,
      newRecipe
    };

    expect(addRecipeSucess(newRecipe)).toEqual(expectedAction);
  });

  it('should dispatch a success action when dispatched with valid details', () => {
    const store = mockStore({});
    axios.post = jest.fn(() => Promise.resolve({
      data: {
        recipe: {
          id: 1, name: 'butter', imageUrl: ''
        }
      }
    }));

    const expectedAction = [
      {
        type: types.CREATE_RECIPE_SUCCESS,
        newRecipe: {
          id: 1, name: 'butter', imageUrl: ''
        }
      }
    ];

    return store.dispatch(createRecipe({}))
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
        type: types.CREATE_RECIPE_FAILURE,
        error: ''
      }
    ];

    return store.dispatch(createRecipe({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    });
  });
});
