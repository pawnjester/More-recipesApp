import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import expect from 'expect';

import deleteReview, { deleteReviewSuccess } from '../../src/actions/deleteReview';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Delete Review Action Creator', () => {
  it('should dispatch a success action when no error occurs', () => {
    const deletedReview = { id: 1 };
    const expectedAction = {
      type: types.DELETE_REVIEW_SUCCESS,
      deletedReview
    };

    expect(deleteReviewSuccess(deletedReview)).toEqual(expectedAction);
  });

  it('should dispatch a success action when no error occurs', () => {
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
  it('should dispatch a failure action when an error occurs', () => {
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
        error: { error: '' }
      }
    ];
    return store.dispatch(deleteReview({})).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
