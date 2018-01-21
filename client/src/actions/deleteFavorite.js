import axios from 'axios';
import { DELETE_FAVORITE_FAILURE, DELETE_FAVORITE_SUCCESS } from './types';


const deletedFavoriteSuccess = recipeId => ({
  type: DELETE_FAVORITE_SUCCESS,
  deletedFavorite: recipeId,
});

const deletedFavoriteFailure = error => ({
  type: DELETE_FAVORITE_FAILURE,
  error,
});

const deletedFavorite = favoriteId => dispatch => axios
  .delete(`/api/v1/recipes/${favoriteId}/favorite`)
  .then(() => {
    dispatch(deletedFavoriteSuccess(favoriteId));
  })
  .catch(() => {
    dispatch(deletedFavoriteFailure('Unable to delete favorite'));
  });

export default deletedFavorite;
