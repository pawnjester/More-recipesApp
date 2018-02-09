import * as types from '../../src/actions/types';
import userDetailReducer from '../../src/reducers/userDetailReducer';


const initialState = {
  userDetail: {},
  success: false,
  errors: '',
};

describe('User Reducer', () => {
  it('should get user detail success', () => {
    const user = '';
    const action = {
      type: types.GET_USER_DETAILS_SUCCESS,
      user
    };
    const newState = userDetailReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        userDetail: user,
        success: true,
        errors: null
      }
    });
  });
  // it('should edit a user',  () => {
  //   const userFound = {
  //     id: 1,
  //     username: 'phil',
  //     email: 'phil@exmaple.com'
  //   };
  //   const action = {
  //     type: types.EDIT_USER_DETAILS_SUCCESS,
  //     editedUser: userFound
  //   }
  //   const newState = userDetailReducer(initialState, action);
  //   expect(newState).toEqual({
  //     ...initialState,
  //     ...{
  //       userDetail: userFound,
  //       success: true,
  //       errors: null
  //     }
  //   });
  // });
  it('should edit a user', () => {
    const error = {};
    const action = {
      type: types.EDIT_USER_DETAILS_FAILURE,
      error
    };
    const newState = userDetailReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        errors: error,
        success: false
      }
    });
  });
});
