import { CREATE_RECIPE_SUCCESS,
  GET_RECIPES,
  DELETE_RECIPE_SUCCESS,
  EDIT_RECIPE_SUCCESS,
  GET_RECIPE_DETAIL_SUCCESS,
} from '../actions/types';

/* eslint-disable */

const initialState = { recipes: [], currentRecipe: {} };

const recipes = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return { ...state, recipes: action.payload.recipes };
    case CREATE_RECIPE_SUCCESS:
      return { ...state, recipes: [...state.recipes, action.payload.recipe] };
    case DELETE_RECIPE_SUCCESS:
      const recipes = state.recipes.filter(recipe => recipe.id !== action.deletedRecipe);
      return {
        ...state,
        recipes,
      };
    case EDIT_RECIPE_SUCCESS:
      // const index = state.recipes.findIndex(singleRecipe => singleRecipe.id===action.editedRecipe.recipe.id);
      // state.recipes.indexOf(action.editedRecipe.recipe.id);
      // console.log(state.recipes);
      // console.log(index);
      const editRecipe = state.recipes.map(recipe => ((recipe.id === action.editedRecipe.recipe.id) ? action.editedRecipe.recipe : recipe));
      // console.log(state.recipes, '*****1');
      // state.recipes.splice(index, 1, action.editedRecipe.recipe);
      // console.log(state.recipes, '*****2');
      return {
        ...state,
        recipes: editRecipe
        // recipes: state.recipes
      };
    case GET_RECIPE_DETAIL_SUCCESS:
      return {
        ...state,
        currentRecipe: action.payload,
      };
    default:
      return state;
  }
};

export default recipes;
