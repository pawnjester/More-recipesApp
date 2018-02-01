import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import searchRecipe, { searchRecipeSuccess } from
  '../../src/actions/searchRecipe';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('searchRecipeAction', () => {
  it('search recipes success action', () => {
    const search = 'pineapples';
    const expectedAction = {
      type: types.SEARCH_RECIPE_SUCCESS,
      search
    };

    expect(searchRecipeSuccess(search)).toEqual(expectedAction);
  });

  it('search recipes action creator', () => {
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
});