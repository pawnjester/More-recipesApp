import * as types from '../../src/actions/types';
import authReducer from '../../src/reducers/auth';

const initialState = {
  isAuthenticated: false,
  user: {},
};

describe('Auth Reducer', ()=> {
  it('should create a new user', () => {
    const user = {
      id: 1,
      username: 'Somali',
      profileImg: 'crazy.jpg'
    };
    const action = {
      type: types.SET_CURRENT_USER,
      user
    };
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({ ...initialState, ...{ user, isAuthenticated: true } });
  });
});
