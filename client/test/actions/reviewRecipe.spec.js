import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import addReview, { addReviewToRecipeSuccess } from '../../src/actions/reviewRecipe';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('addReviewAction', () => {
  it('add review to recipe success action', () => {
    const review = { data: 'yoooooooo' };
    const expectedAction = {
      type: types.ADD_REVIEW,
      review
    };

    expect(addReviewToRecipeSuccess(review)).toEqual(expectedAction);
  });

  it('add recipe action creator', () => {
    const store = mockStore({});
    axios.post = jest.fn(() => Promise.resolve({
      data: {
        reviewed: { //returned from server side
          data: 'yoooooo'
        }
      }
    }));

    const expectedAction = [
      {
        type: types.ADD_REVIEW,
        review: { //what the action returns
          data: 'yoooooo'
        }
      }
    ];

    return store.dispatch(addReview({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
});
