import { GET_USER_DETAILS_SUCCESS, EDIT_USER_DETAILS_SUCCESS } from '../actions/types';

const initialState = {
  userDetail: {},
  success: false,
  errors: null,
};

const userDetail = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state, userDetail: action.user, success: true, errors: null,
      };
    case EDIT_USER_DETAILS_SUCCESS:
      console.log('123445566',action.editedUser);
      return {
        ...state,
        userDetail: action.editedUser.userFound,
        success: true,
        errors: null,
      };
    default:
      return state;
  }
};

export default userDetail;
