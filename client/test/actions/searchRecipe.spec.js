import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import expect from 'expect';

import searchRecipe, { searchRecipeSuccess } from
  '../../src/actions/searchRecipe';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Search Recipe Action Creator', () => {
  it('should dispatch a success action when no error occurs', () => {
    const search = 'pineapples';
    const expectedAction = {
      type: types.SEARCH_RECIPE_SUCCESS,
      search
    };

    expect(searchRecipeSuccess(search)).toEqual(expectedAction);
  });

  it('should dispatch a success action when no error occurs', () => {
    const store = mockStore({});
    axios.get = jest.fn(() => Promise.resolve({
      data: {
        searchResults: [{
          id: '2', username: 'richard', email: 'richard@example.com'
        }]
      }
    }));

    const expectedAction = [
      {
        type: types.SEARCH_RECIPE_SUCCESS,
        search: [{ id: '2', username: 'richard', email: 'richard@example.com' }],
      },
    ];

    return store.dispatch(searchRecipe({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
  it('should dispatch a failure action when an error occurs', () => {
    const store = mockStore({});
    axios.get = jest.fn(() => Promise.reject({
      response: {
        data: {
          searchResults: {
            error: ''
          }
        }
      }
    }));
    const expectedAction = [
      {
        type: types.SEARCH_RECIPE_FAILURE,
        error: {
          error: ''
        }
      }
    ];

    return store.dispatch(searchRecipe({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
