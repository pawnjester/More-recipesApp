import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import getReview, { getReviewSuccess } from
  '../../src/actions/getAllReviews';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Get All Reviews Action Creator', () => {
  it('should dispatch a success action when no error occurs', () => {
    const review = [{ id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes' }];
    const expectedAction = {
      type: types.GET_REVIEW_SUCCESS,
      review
    };

    expect(getReviewSuccess(review)).toEqual(expectedAction);
  });

  it('should dispatch a success action when no error occurs', () => {
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
        error: 'Unable to add review'
      }
    ];

    return store.dispatch(getReview({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    });
  });
});
