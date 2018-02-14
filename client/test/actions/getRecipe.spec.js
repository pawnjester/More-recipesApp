import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import getRecipe, { getUserRecipesSuccess } from
  '../../src/actions/getRecipe';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Get User Recipe Action Creator', () => {
  it('should dispatch a success action when no error occurs', () => {
    const payload = [{ id: '2', username: 'richard', email: 'richard@example.com' }];
    const expectedAction = {
      type: types.GET_RECIPES,
      payload
    };

    expect(getUserRecipesSuccess(payload)).toEqual(expectedAction);
  });

  it('should dispatch a success action when no error occurs', () => {
    const store = mockStore({});
    axios.get = jest.fn(() => Promise.resolve({
        data: {
          recipes: [],
          pagination: {
            NumberOfItems: 1, Limit:5, Pages:1, CurrentPage:1,
          }
      }
    }));

    const expectedAction = [
      {
        type: types.GET_RECIPES,
        payload: {recipes: [],
          pagination: {
            NumberOfItems: 1, Limit:5, Pages:1, CurrentPage:1,
          } },
      },
      {
        detail: {
          NumberOfItems: 1, Limit:5, Pages:1, CurrentPage:1,
        },
        type: 'GET_PAGE_DETAIL'
      }
    ];

    return store.dispatch(getRecipe(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
  it('should dispatch a failure action when an error occurs', () => {
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
          data: {
            error: ''
          }
        }
      }
    ];

    return store.dispatch(getRecipe({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    });
  });
});
