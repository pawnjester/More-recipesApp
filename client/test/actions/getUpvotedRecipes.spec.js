import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import expect from 'expect';

import getUpvotedRecipes, { getUpvotedRecipesSuccess } from
  '../../src/actions/getUpvotedRecipes';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Get Upvoted Recipe Action Creator', () => {
  it('should dispatch a success action when no error occurs', () => {
    const upvotedRecipes = [{
      id: '2',
      name: 'farmhouse',
      ingredients: 'beans and tomatoes'
    }, {
      id: '3',
      name: 'tomatoes',
      ingredients:
    'tomatoe and oil'
    }];
    const expectedAction = {
      type: types.GET_UPVOTED_RECIPES_SUCCESS,
      upvotedRecipes
    };

    expect(getUpvotedRecipesSuccess(upvotedRecipes)).toEqual(expectedAction);
  });

  it('should dispatch a success action when no error occurs', () => {
    const store = mockStore({});
    axios.get = jest.fn(() => Promise.resolve({
      data: {
        recipe: {
          id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes'

        }
      }
    }));

    const expectedAction = [
      {
        type: types.GET_UPVOTED_RECIPES_SUCCESS,
        upvotedRecipes: { id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes' }
      }
    ];

    return store.dispatch(getUpvotedRecipes({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
  it('should dispatch a failure action when an error occurs', () => {
    const store = mockStore({});
    axios.get = jest.fn(() => Promise.reject({
      error: ''
    }));
    const expectedAction = [
      {
        type: types.GET_UPVOTED_RECIPES_FAILURE,
        error: undefined
      }
    ];
    return store.dispatch(getUpvotedRecipes({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
});
