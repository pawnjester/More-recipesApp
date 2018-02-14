import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import getReview, { getReviewSuccess } from
  '../../src/actions/getAllReviews';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getAllReviewsAction', () => {
  it('get all recipe success action', () => {
    const review = [{ id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes' }];
    const expectedAction = {
      type: types.GET_REVIEW_SUCCESS,
      review
    };

    expect(getReviewSuccess(review)).toEqual(expectedAction);
  });

  it('get all reviews action creator', () => {
    const store = mockStore({});
    axios.get = jest.fn(() => Promise.resolve({
      data: {
        reviews: [{
          id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes'
        }]
      }
    }));

    const expectedAction = [
      {
        type: types.GET_REVIEW_SUCCESS,
        review: [{ id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes' }]
      }
    ];

    return store.dispatch(getReview({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
});
