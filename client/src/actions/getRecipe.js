import axios from 'axios';
import { GET_RECIPES, GET_PAGE_DETAIL } from './types';

const getPageDetail = detail => ({
  type: GET_PAGE_DETAIL,
  detail,
});
const getRecipe = page => dispatch =>
  // page = page || 1;
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
      console.log(error.response);
    });


export default getRecipe;
