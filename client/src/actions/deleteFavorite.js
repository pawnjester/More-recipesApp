import axios from 'axios';
import { DELETE_FAVORITE_FAILURE, DELETE_FAVORITE_SUCCESS } from './types';


export const deletedFavoriteSuccess = recipeId => ({
  type: DELETE_FAVORITE_SUCCESS,
  deletedFavorite: recipeId,
});

export const deletedFavoriteFailure = error => ({
  type: DELETE_FAVORITE_FAILURE,
  error,
});

const deletedFavorite = favoriteId => dispatch => axios
  .delete(`/api/v1/recipes/${favoriteId}/favorite`)
  .then(() => {
    return dispatch(deletedFavoriteSuccess(favoriteId));
  })
  .catch((error) => {
    dispatch(deletedFavoriteFailure(error.response.data));
  });

export default deletedFavorite;
