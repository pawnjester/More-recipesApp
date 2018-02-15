import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import expect from 'expect';

import upvoteRecipe, { upvoteRecipeSuccess } from '../../src/actions/upvoteRecipe';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Upvote Recipe Action Creator', () => {
  it('should dispatch a success action when no error occurs', () => {
    const upvote = { id: 1, name: 'butter', imageUrl: '' };
    const expectedAction = {
      type: types.UPVOTE_RECIPE_SUCCESS,
      upvote
    };

    expect(upvoteRecipeSuccess(upvote)).toEqual(expectedAction);
  });

  it('should dispatch a success action when no error occurs', () => {
    const store = mockStore({});
    axios.post = jest.fn(() => Promise.resolve({
      data: {
        Recipe: {
          id: 1, name: 'butter', imageUrl: ''
        }
      }
    }));

    const expectedAction = [
      {
        type: types.UPVOTE_RECIPE_SUCCESS,
        upvote: {
          id: 1, name: 'butter', imageUrl: ''
        }
      }
    ];

    return store.dispatch(upvoteRecipe({}))
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
        type: types.UPVOTE_RECIPE_FAILURE,
        error: {
          error: ''
        }
      }
    ];

    return store.dispatch(upvoteRecipe({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
