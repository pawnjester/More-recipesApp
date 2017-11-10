import  { ADD_RECIPE, DELETE_RECIPE } from '../actions/types';


// const recipe = (action) => {
//   let { recipe } = action;
//   return {
//     id: Math.random(),
//     recipe
//   }
// }

const recipe = {
  id: Math.random,
  name: '',
};

// const removeRecipeById = (state = [], id) => {
//   const recipes = state.filter(recipe => recipe.id !== id);
//   return recipes;
// }

const recipes = (state = recipe, action) => {
  // let recipes = null;

  switch (action.type) {
    case ADD_RECIPE:
      return [
        ...state,
        Object.assign({}, action.recipe)
      ];
      // recipes = [...state, recipe(action)];
      // return recipes;

    // case DELETE_RECIPE:
    //   recipes = removeRecipeById(state, action.id);
    //   return recipes;
      // recipes = [...state, recipe(action)];
    default:
      return state;
  }


};

export default recipes;
