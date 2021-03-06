import axios from 'axios';
import { GET_RECIPES, GET_PAGE_DETAIL, GET_RECIPES_FAILURE } from './types';

const getPageDetail = detail => ({
  type: GET_PAGE_DETAIL,
  detail,
});
export const getUserRecipesSuccess = payload => ({
  type: GET_RECIPES,
  payload
});

const getRecipeFailure = error => ({
  type: GET_RECIPES_FAILURE,
  error
});
const getRecipe = page => dispatch =>
  axios.get(`/api/v1/recipes/userRecipe?page=${page || 1}`)
    .then((response) => {
      const {
        NumberOfItems, Limit, Pages, CurrentPage,
      } = response.data.pagination;
      const paginationInfo = {
        CurrentPage, Limit, NumberOfItems, Pages,
      };
      dispatch(getUserRecipesSuccess(response.data));
      dispatch(getPageDetail(paginationInfo));
    })
    .catch((error) => {
      dispatch(getRecipeFailure(error.response));
    });


export default getRecipe;
