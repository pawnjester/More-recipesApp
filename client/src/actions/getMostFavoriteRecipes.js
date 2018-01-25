import axios from 'axios';
import { GET_MOST_FAVORITED_RECIPES, GET_MOST_FAVORITED_RECIPES_FAILURE } from './types';

const getMostFavoritesSuccess = favorites => ({
  type: GET_MOST_FAVORITED_RECIPES,
  favorites
});

const getMostFavoritesFailure = error => ({
  type: GET_MOST_FAVORITED_RECIPES_FAILURE,
  error
});


const getMostFavorites = () => dispatch => axios
  .get('/api/v1/recipes/most-favorites')
  .then((response) => {
    dispatch(getMostFavoritesSuccess(response.data));
  })
  .catch((err) => {
    dispatch(getMostFavoritesFailure(err));
  });

export default getMostFavorites;
