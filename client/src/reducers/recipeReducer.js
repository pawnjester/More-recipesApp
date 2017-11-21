import { CREATE_RECIPE_SUCCESS, GET_RECIPES, DELETE_RECIPE_SUCCESS, EDIT_RECIPE_SUCCESS } from '../actions/types';

const initialState = {  recipes : [] };

const recipes = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {...state, recipes: action.payload.recipes}
    case CREATE_RECIPE_SUCCESS:
      return {...state, recipes: [...state.recipes, action.payload.recipe]}

    case DELETE_RECIPE_SUCCESS:
      const recipes = state.recipes.filter(recipe => recipe.id !== action.deletedRecipe)
      return {
        ...state,
        recipes
      }
    case EDIT_RECIPE_SUCCESS:
      const editRecipe = state.recipes.map((recipe) => (recipe.id === action.editedRecipe.id) ? action.editedRecipe : recipe)
      return {
        ...state,
        editRecipe
      }
    default:
      return state;
  }
};

export default recipes;
