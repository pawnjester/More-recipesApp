import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import expect from 'expect';

import addReview, { addReviewToRecipeSuccess }
  from '../../src/actions/reviewRecipe';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Add Review Action Creator', () => {
  it('should dispatch a success action when no error occurs', () => {
    const review = { data: 'yoooooooo' };
    const expectedAction = {
      type: types.ADD_REVIEW,
      review
    };

    expect(addReviewToRecipeSuccess(review)).toEqual(expectedAction);
  });

  it('should dispatch a success action when no error occurs', () => {
    const store = mockStore({});
    axios.post = jest.fn(() => Promise.resolve({
      data: {
        reviewed: {
          data: 'yoooooo'
        }
      }
    }));

    const expectedAction = [
      {
        type: types.ADD_REVIEW,
        review: {
          data: 'yoooooo'
        }
      }
    ];

    return store.dispatch(addReview({}))
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
        type: types.ADD_REVIEW_FAILURE,
        error: 'Unable to add review'
      }
    ];

    return store.dispatch(addReview({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
