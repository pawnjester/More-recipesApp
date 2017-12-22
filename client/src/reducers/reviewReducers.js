import { ADD_REVIEW, GET_REVIEW_SUCCESS } from '../actions/types';

const initialState = {
  reviewed: [],
  // getReview: [],
};

const review = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      // return {
      //   ...state.reviewed,
      //   reviewed: action.review,
      // };
      return Object.assign({}, state, {reviewed: [...state.reviewed, action.review]});
    case GET_REVIEW_SUCCESS:
      return {
        ...state,
        reviewed: action.review,
      };
    default:
      return state;
  }
};

export default review;
