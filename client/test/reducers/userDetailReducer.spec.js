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
  it('should handle errors for change password',() => {
    const error = {};
    const action = {
      type: types.CHANGE_PASSWORD_FAILURE,
      error
    }
    const newState = userDetailReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        success: false,
        errors: error
      }
    })
  });
});
