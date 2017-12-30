import { UPVOTE_RECIPE_SUCCESS, DOWNVOTE_RECIPE_SUCCESS, UPVOTE_RECIPE_FAILURE, DOWNVOTE_RECIPE_FAILURE } from '../actions/types';

const initialState = {
  votes: {},
  success: false,
  errors: null,
};

const voteReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPVOTE_RECIPE_SUCCESS:
      return {
        ...state, votes: action.upvote, success: true, errors: null,
      };

    case UPVOTE_RECIPE_FAILURE:
      return {
        ...state, votes: {}, success: false, errors: action.error,
      };

    case DOWNVOTE_RECIPE_SUCCESS:
      return {
        ...state, votes: action.downvote, success: true, errors: null,
      };

    case DOWNVOTE_RECIPE_FAILURE:
      return {
        ...state, votes: {}, success: false, errors: action.error,
      };
    default:
      return state;
  }
};

export default voteReducer;

