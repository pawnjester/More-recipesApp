import axios from 'axios';
import { CHECK_FAVORITED_ID_SUCESS, CHECK_FAVORITED_ID_FAILURE } from './types';


const checkIfFavoritedSuccess = favorite => ({
  type: CHECK_FAVORITED_ID_SUCESS,
  favorite,
});

const checkIfFavoritedFailure = error => ({
  type: CHECK_FAVORITED_ID_FAILURE,
  error,
});
const checkIfFavorited = () => dispatch => axios
  .get('/api/v1/recipes/checkfavoriteId')
  .then((response) => {
    dispatch(checkIfFavoritedSuccess(response.data.recipeIds));
  })
  .catch((error) => {
    dispatch(checkIfFavoritedFailure(error.response.data));
  });

export default checkIfFavorited;
