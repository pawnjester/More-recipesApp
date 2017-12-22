import { GET_RECIPE_DETAIL_SUCCESS } from '../actions/types';

const initialState = {
  currentRecipe: {},
};


// const detail = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_RECIPE_DETAIL_SUCCESS:
//       return {
//         ...state,
//         currentRecipe: action.detail,
//       };
//     default:
//       return state;
//   }
// };

const detail = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPE_DETAIL_SUCCESS:
      return {
        ...state,
        currentRecipe: action.detail,
      };
    default:
      return state;
  }
};

export default detail;
