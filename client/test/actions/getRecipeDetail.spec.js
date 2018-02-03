import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import getRecipeDetail, { getRecipeDetailSuccess } from
  '../../src/actions/getRecipeDetail';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getAllRecipeDetailAction', () => {
  it('get recipe detail success action', () => {
    const detail = { id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes' };
    const expectedAction = {
      type: types.GET_RECIPE_DETAIL_SUCCESS,
      detail
    };

    expect(getRecipeDetailSuccess(detail)).toEqual(expectedAction);
  });

  it('get recipes detail action creator', () => {
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
});
