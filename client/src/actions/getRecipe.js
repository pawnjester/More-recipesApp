import axios from 'axios';
import { GET_RECIPES, GET_PAGE_DETAIL, GET_ALL_RECIPES_FAILURE } from './types';

const getPageDetail = detail => ({
  type: GET_PAGE_DETAIL,
  detail,
});

const getRecipeFailure = error => ({
  type: GET_ALL_RECIPES_FAILURE,
  error
});
const getRecipe = page => dispatch =>
  axios.get(`/api/v1/recipes/userRecipe?page=${page || 1}`)
    .then((response) => {
      const {
        NumberOfItems, Limit, Pages, CurrentPage,
      } = response.data;
      const paginationInfo = {
        CurrentPage, Limit, NumberOfItems, Pages,
      };
      dispatch({ type: GET_RECIPES, payload: response.data });
      dispatch(getPageDetail(paginationInfo));
    })
    .catch((error) => {
      dispatch(getRecipeFailure(error.data));
    });


export default getRecipe;
