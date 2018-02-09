import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import downvoteRecipe, { downvoteRecipeSuccess } from '../../src/actions/downvoteRecipe';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('downvoteRecipeAction', () => {
  it('downvote recipe success action', () => {
    const downvote = { id: 1, name: 'butter', imageUrl: '' };
    const expectedAction = {
      type: types.DOWNVOTE_RECIPE_SUCCESS,
      downvote
    };

    expect(downvoteRecipeSuccess(downvote)).toEqual(expectedAction);
  });

  it('downvote recipe action creator', () => {
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

  it('should handle error', () => {
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
