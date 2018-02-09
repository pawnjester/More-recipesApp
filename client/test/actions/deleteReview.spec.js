import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import deleteReview, { deleteReviewSuccess } from '../../src/actions/deleteReview';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('deleteReviewAction', () => {
  it('delete review success action', () => {
    const deletedReview = { id: 1 };
    const expectedAction = {
      type: types.DELETE_REVIEW_SUCCESS,
      deletedReview
    };

    expect(deleteReviewSuccess(deletedReview)).toEqual(expectedAction);
  });

  it('delete review action creator', () => {
    const store = mockStore({});
    axios.delete = jest.fn(() => Promise.resolve({
    }));

    const expectedAction = [
      {
        type: types.DELETE_REVIEW_SUCCESS,
        deletedReview: {}
      }
    ];

    return store.dispatch(deleteReview({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
  it('should hamdle error for deleting review', () => {
    const store = mockStore({});
    axios.delete = jest.fn(() => Promise.reject({
      response: {
        data: {
          error: ''
        }
      }
    }));
    const expectedAction = [
      {
        type: types.DELETE_REVIEW_FAILURE,
        error: {'error': ''}
      }
    ];
    return store.dispatch(deleteReview({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })
});
