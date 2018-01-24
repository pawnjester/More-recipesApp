import axios from 'axios';
import { GET_MOST_FAVORITED_RECIPES } from './types';

const getMostFavoritesSuccess = favorites => ({
  type: GET_MOST_FAVORITED_RECIPES,
  favorites
});


const getMostFavorites = () => dispatch => axios
  .get('/api/v1/recipes/most-favorites')
  .then((response) => {
    console.log('>>>>getMEssg', response.data);
    dispatch(getMostFavoritesSuccess(response.data));
  })
  .catch((err) => {
    console.log(err);
  });

export default getMostFavorites;
