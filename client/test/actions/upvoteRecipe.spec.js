import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import upvoteRecipe, { upvoteRecipeSuccess } from '../../src/actions/upvoteRecipe';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('upvoteRecipeAction', () => {
  it('add recipe success action', () => {
    const upvote = { id: 1, name: 'butter', imageUrl: '' };
    const expectedAction = {
      type: types.UPVOTE_RECIPE_SUCCESS,
      upvote
    };

    expect(upvoteRecipeSuccess(upvote)).toEqual(expectedAction);
  });

  it('upvote recipe action creator', () => {
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
        type: types.UPVOTE_RECIPE_FAILURE,
          error: {
            error: ''
          }
      }
    ];

    return store.dispatch(upvoteRecipe({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    });
  });
});
