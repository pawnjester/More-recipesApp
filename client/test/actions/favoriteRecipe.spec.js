import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import favoriteRecipe, { favoriteRecipeSuccess } from '../../src/actions/favoriteRecipe';
import * as types from '../../src/actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('favoriteRecipeAction', () => {
  it('favorite recipe success action', () => {
    const favorite = { id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes' };
    const expectedAction = {
      type: types.FAVORITE_RECIPE_SUCCESS,
      favorite
    };

    expect(favoriteRecipeSuccess(favorite)).toEqual(expectedAction);
  });

  it('favorite recipe action creator', () => {
    const store = mockStore({});
    axios.post = jest.fn(() => Promise.resolve({
      data: {
        id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes'
      }
    }));

    const expectedAction = [
      {
        type: types.FAVORITE_RECIPE_SUCCESS,
        favorite: { //what the action returns
          id: '2', name: 'farmhouse', ingredients: 'beans and tomatoes'
        }
      }
    ];

    return store.dispatch(favoriteRecipe({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
});
