import expect from 'expect';
import * as types from '../../src/actions/types';
import recipeDetailReducer from '../../src/reducers/recipeDetailReducer';

const initialState = {
  currentRecipe: {},
  favoriteRecipes: [],
  checkIfFavorited: [],
  favoriteStatus: false,
  message: '',
  success: false,
  errors: null,
};
describe('Recipe Detail Reducer', () => {
  it('should upvote a recipe', () => {
    const upvote = {
      id: 1,
      name: '',
      method: '',
      upVotes: 1,
      downVotes: 0
    };
    const action = {
      type: types.UPVOTE_RECIPE_SUCCESS,
      upvote
    };
    const newState = recipeDetailReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        checkIfFavorited: [],
        currentRecipe: {
          downVotes: 0, id: 1, method: '', name: '', upVotes: 1
        },
        success: true,
        errors: null,
        favoriteRecipes: [],
        favoriteStatus: false,
        message: '',
      }
    });
  });
  it('should handle errors for upvoting recipes', () => {
    const error = {};
    const action = {
      type: types.UPVOTE_RECIPE_FAILURE,
      error
    };
    const newState = recipeDetailReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        currentRecipe: {},
        success: false,
        errors: error,
      }
    });
  });
  it('should get recipe detail', () => {
    const detail = {
      singleRecipe: {
        id: 1,
        name: 'Rice cica',
        ingredients: 'rice, cica',
        method: 'boil the rice',
        upVotes: 1,
        downvotes: 0,
        Favorites: [{}]
      }
    };
    const action = {
      type: types.GET_RECIPE_DETAIL_SUCCESS,
      detail
    };
    const newState = recipeDetailReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        currentRecipe: detail.singleRecipe,
        favoriteStatus: true,
        success: true,
        errors: null
      }
    });
  });
  it('should downvote a recipe', () => {
    const downvote = {
      id: 1,
      name: '',
      method: '',
      upVotes: 0,
      downVotes: 1
    };
    const action = {
      type: types.DOWNVOTE_RECIPE_SUCCESS,
      downvote
    };
    const newState = recipeDetailReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        checkIfFavorited: [],
        currentRecipe: {
          downVotes: 1, id: 1, method: '', name: '', upVotes: 0
        },
        success: true,
        errors: null,
        favoriteRecipes: [],
        favoriteStatus: false,
        message: '',
      }
    });
  });
  it('should handle errors for downvoting recipes', () => {
    const error = {};
    const action = {
      type: types.DOWNVOTE_RECIPE_FAILURE,
      error
    };
    const newState = recipeDetailReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        currentRecipe: {},
        success: false,
        errors: error,
      }
    });
  });
  it('should favorite a recipe', () => {
    const favorite = {
      id: 1,
      name: '',
      method: '',
      upVotes: 0,
      downVotes: 1
    };
    const action = {
      type: types.FAVORITE_RECIPE_SUCCESS,
      favorite
    };
    const newState = recipeDetailReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        checkIfFavorited: [],
        currentRecipe: {},
        errors: null,
        favoriteRecipes: favorite,
        favoriteStatus: false,
        message: favorite,
        success: true
      }
    });
  });
  it('should handle errors for favoriting recipes', () => {
    const error = {};
    const action = {
      type: types.FAVORITE_RECIPE_FAILURE,
      error
    };
    const newState = recipeDetailReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        favoriteRecipes: [],
        success: false,
        errors: error,
      }
    });
  });
  it('should get all favorites', () => {
    const favorite = {
      id: 1,
      name: '',
      method: '',
      upVotes: 0,
      downVotes: 1
    };
    const action = {
      type: types.GET_FAVORITE_RECIPES_SUCCESS,
      favorite
    };
    const newState = recipeDetailReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        favoriteRecipes: favorite,
        success: true,
        errors: null
      }
    });
  });
  it('should handle errors for get favoriting recipes', () => {
    const error = {};
    const action = {
      type: types.GET_FAVORITE_RECIPES_FAILURE,
      error
    };
    const newState = recipeDetailReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        favoriteRecipes: [],
        success: false,
        errors: error,
      }
    });
  });
  it('should add a review', () => {
    const review = {
      data: 'dont play with me'
    };
    const action = {
      type: types.ADD_REVIEW,
      review
    };
    const newState = recipeDetailReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        currentRecipe: review,
        errors: null,
        message: '',
        success: true
      }
    });
  });
  it('should handle errors for adding a review', () => {
    const error = {};
    const action = {
      type: types.ADD_REVIEW_FAILURE,
      error
    };
    const newState = recipeDetailReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        success: false,
        errors: error
      }
    });
  });
  it('should delete a review', () => {
    const deletedReview = 1;
    const action = {
      type: types.DELETE_REVIEW_SUCCESS,
      deletedReview
    };
    const state = {
      currentRecipe: {
        Reviews: [
          {
            id: 1,
            review: ''
          },
          {
            id: 2,
            review: ''
          }
        ]
      }
    };
    const newState = recipeDetailReducer(state, action);
    expect(newState).toEqual({
      currentRecipe: {
        Reviews: [
          {
            id: 2,
            review: ''
          }
        ]
      },
      errors: null,
      success: true
    });
  });
  it('should handle errors for deleting a review', () => {
    const error = {};
    const action = {
      type: types.DELETE_REVIEW_FAILURE,
      error
    };
    const newState = recipeDetailReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        success: false,
        errors: error
      }
    });
  });
  it('should delete a favorite', () => {
    const deletedFavorite = 1;
    const action = {
      type: types.DELETE_FAVORITE_SUCCESS,
      deletedFavorite
    };
    const state = {
      favoriteRecipes: {
        userFavorite: [
          {
            id: 1,
            name: 'sdsss',
            method: 'efgfhjf'
          },
          {
            id: 2,
            name: 'fsgfsgd',
            method: 'dsfghj'
          }
        ]
      }
    };
    const newState = recipeDetailReducer(state, action);
    expect(newState).toEqual({
      favoriteRecipes: {
        userFavorite: [
          {
            id: 2,
            name: 'fsgfsgd',
            method: 'dsfghj'
          }
        ]
      }
    });
  });
  it('should handle errors for deleting a favorite recipes', () => {
    const error = {};
    const action = {
      type: types.DELETE_FAVORITE_FAILURE,
      error
    };
    const newState = recipeDetailReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        errors: error
      }
    });
  });
});
