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
    console.log("but i am here")
    return dispatch(deletedFavoriteSuccess(favoriteId));
  })
  .catch((error) => {
    console.log('>>>eroor confirm', error.response);
    dispatch(deletedFavoriteFailure('Unable to delete favorite'));
  });

export default deletedFavorite;
