/*eslint-disable */
import { ADD_RECIPE } from '../actions/types';

const initialState = {};

const recipes = (state = initialState, action) => {

  switch (action.type) {
    case ADD_RECIPE:
      console.log(action.payload)
      return { ...state, [action.payload.name]: action.payload }
      // return {
      //   ...state,
      //   recipes: action.recipe
      // };
      // return [...state,
      // Object.assign({}, action.recipe)]
      // console.log('****', state, action)
    default:
      return state;
  }
};

export default recipes;
