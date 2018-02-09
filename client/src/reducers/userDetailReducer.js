import {
  GET_USER_DETAILS_SUCCESS,
  CHANGE_PASSWORD_FAILURE
} from '../actions/types';

const initialState = {
  userDetail: {},
  success: false,
  errors: '',
};

const userDetail = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state, userDetail: action.user, success: true, errors: null,
      };
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        success: false,
        errors: action.error
      };
    default:
      return state;
  }
};

export default userDetail;
