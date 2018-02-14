import { CONFIRM_EMAIL_SUCCESS, CONFIRM_EMAIL_FAILURE } from '../actions/types';

const initialState = {
  checkemail: '',
  success: false,
  error: null,
};

const checkEmail = (state = initialState, action) => {
  switch (action.type) {
    case CONFIRM_EMAIL_SUCCESS:
      return {
        ...state, checkemail: action.email, success: true, errors: null,
      };
    case CONFIRM_EMAIL_FAILURE:
      return {
        ...state,
        checkemail: action.error,
        success: true,
        errors: null,
      };
    default:
      return state;
  }
};

export default checkEmail;
