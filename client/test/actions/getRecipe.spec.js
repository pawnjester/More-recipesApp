import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import getRecipe, { getUserRecipesSuccess } from
  '../../src/actions/getRecipe';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getUserRecipeAction', () => {
  it('get user recipes success action', () => {
    const payload = [{ id: '2', username: 'richard', email: 'richard@example.com' }];
    const expectedAction = {
      type: types.GET_RECIPES,
      payload
    };

    expect(getUserRecipesSuccess(payload)).toEqual(expectedAction);
  });

  it('get user recipes action creator', () => {
    const store = mockStore({});
    axios.get = jest.fn(() => Promise.resolve({
      data: {
        id: '2', username: 'richard', email: 'richard@example.com'
      }
    }));

    const expectedAction = [
      {
        type: types.GET_RECIPES,
        payload: { id: '2', username: 'richard', email: 'richard@example.com' },
      },
      {
        detail: {
          CurrentPage: undefined, Limit: undefined, 'NumberO      0 |     4.76fItems': undefined, Pages: undefined
        },
        type: 'GET_PAGE_DETAIL'
      }
    ];

    return store.dispatch(getRecipe({}))
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
        type: types.GET_RECIPES_FAILURE,
        error: {
          error: ''
        }
      }
    ];

    return store.dispatch(getRecipe({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    });
  });
});
