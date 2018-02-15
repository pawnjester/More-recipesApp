import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import expect from 'expect';

import downvoteRecipe, { downvoteRecipeSuccess } from '../../src/actions/downvoteRecipe';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Downvote Recipe Action Creator', () => {
  it('should dispatch a success action when no error occurs', () => {
    const downvote = { id: 1, name: 'butter', imageUrl: '' };
    const expectedAction = {
      type: types.DOWNVOTE_RECIPE_SUCCESS,
      downvote
    };

    expect(downvoteRecipeSuccess(downvote)).toEqual(expectedAction);
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
        type: types.DOWNVOTE_RECIPE_SUCCESS,
        downvote: {
          id: 1, name: 'butter', imageUrl: ''
        }
      }
    ];

    return store.dispatch(downvoteRecipe({}))
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
        type: types.DOWNVOTE_RECIPE_FAILURE,
        error: {
          error: ''
        }
      }
    ];

    return store.dispatch(downvoteRecipe({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    });
  });
});
