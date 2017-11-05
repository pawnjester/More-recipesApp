import  { RECIPE } from '../actions/types';


const recipe = (action) => {
  let { recipe } = action;
  return {
    recipe
  }
}

const recipes = (state = [], action) => {
  let recipes = null;

  switch (action.type) {
    case RECIPE:
      // return [
      //   ...state,
      //   Object.assign({}, action.recipe)
      // ];
      recipes = [...state, recipe(action)];
      return recipes;
    default:
      return state;
  }
}

export default recipes;