import { GET_PAGE_DETAIL } from '../actions/types';

const initialState = {
  pageInfo: 1,
};

const userDetail = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAGE_DETAIL:
      return {
        ...state, userDetail: action.user, success: true, errors: null,
      };
    default:
      return state;
  }
};

export default userDetail;
