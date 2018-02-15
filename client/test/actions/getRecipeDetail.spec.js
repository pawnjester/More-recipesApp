import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import expect from 'expect';

import getRecipeDetail, { getRecipeDetailSuccess } from
  '../../src/actions/getRecipeDetail';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Get All Recipe Detail Action Creator', () => {
  it('should dispatch a success action when no error occurs', () => {
    const detail = { id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes' };
    const expectedAction = {
      type: types.GET_RECIPE_DETAIL_SUCCESS,
      detail
    };

    expect(getRecipeDetailSuccess(detail)).toEqual(expectedAction);
  });

  it('should dispatch a success action when no error occurs', () => {
    const store = mockStore({});
    axios.get = jest.fn(() => Promise.resolve({
      data: {
        singleRecipe: {
          id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes'
        }
      }
    }));

    const expectedAction = [
      {
        type: types.GET_RECIPE_DETAIL_SUCCESS,
        detail: { singleRecipe: { id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes' }}
      }
    ];

    return store.dispatch(getRecipeDetail({}))
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
        type: types.GET_RECIPE_DETAIL_FAILURE,
        error: ''
      }
    ];

    return store.dispatch(getRecipeDetail({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    });
  });
});
