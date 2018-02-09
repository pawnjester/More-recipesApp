import * as types from '../../src/actions/types';
import recipeReducer from '../../src/reducers/recipeReducer';

const initialState = {
  recipes: [],
  searchResults: [],
  totalContent: 1,
  upvotedRecipes: [],
  mostFavorites: {},
  pages: 1,
};

describe('Recipe Reducer', () => {
  // it('should get users recipes', () => {
  //   const recipes = {};
  //   const action = {
  //     type: types.GET_RECIPES,
  //     payload: recipes
  //   };
  //   const newState = recipeReducer(initialState, action);
  //   expect(newState).toEqual({
  //     ...initialState,
  //     ...{
  //       // totalContent: 0,
  //       recipes,
  //       deleted: false
  //     }
  //   })
  // })
  it('should delete a recipe', () => {
    const recipes = [];
    const action = {
      type: types.DELETE_RECIPE_SUCCESS,
      recipes
    };
    const newState = recipeReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        deleted: true,
        totalContent: -1,
        recipes
      }
    });
  })
  it('it should get all the recipes', () => {
    const recipes = {
      id: 1,
      name: '',
      method: '',
      upVotes: 1,
      downVotes: 0
    };
    const action = {
      type: types.GET_ALL_RECIPES_SUCCESS,
      recipes
    };
    const newState = recipeReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        recipes
      }
    });
  });
  it('should handle errors for getting all recipes', () => {
    const error = {};
    const action = {
      type: types.GET_ALL_RECIPES_FAILURE,
      error
    };
    const newState = recipeReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        error: {}, mostFavorites: {}, pages: 1, recipes: [], searchResults: [], totalContent: 1, upvotedRecipes: []
      }
    });
  });
  it('should search for a recipe', () => {
    const search = {
      name: 'danish sauce'
    };
    const action = {
      type: types.SEARCH_RECIPE_SUCCESS,
      search
    };
    const newState = recipeReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        searchResults: search,
        totalContent: 0,
        deleted: false
      }
    });
  });
  it('should handle errors for search recipe', () => {
    const error = {};
    const action = {
      type: types.SEARCH_RECIPE_FAILURE,
      error
    };
    const newState = recipeReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        searchResults: error,
        deleted: false
      }
    })
  })
  it('should get upvoted recipes', () => {
    const upvotedRecipes = {
      id: 1,
      name: 'chilli',
      method: 'boil',
      upVotes: 1,
      downVotes: 0,
    };
    const action = {
      type: types.GET_UPVOTED_RECIPES_SUCCESS,
      upvotedRecipes
    };
    const newState = recipeReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        upvotedRecipes,
        totalContent: 0,
        deleted: false
      }
    });
  });
  it('should most favorited recipes', () => {
    const favorites = {
      id: 1,
      name: 'chilli',
      method: 'boil',
      upVotes: 1,
      downVotes: 0,
    };
    const action = {
      type: types.GET_MOST_FAVORITED_RECIPES,
      favorites
    };
    const newState = recipeReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        totalContent: 0,
        mostFavorites: favorites,
        deleted: false
      }
    });
  });
  it('should create a recipe', () => {
    const newRecipe = {
      id: 1,
      name: 'chilli',
      method: 'boil',
      upVotes: 1,
      downVotes: 0,
    };
    const action = {
      type: types.CREATE_RECIPE_SUCCESS,
      newRecipe
    };
    const newState = recipeReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        deleted: false,
        totalContent: 0,
        recipes: [newRecipe]
      }
    });
  });
  it('should delete a recipe', () => {
    const deletedRecipe = 1;
    const action = {
      type: types.DELETE_RECIPE_SUCCESS,
      deletedRecipe
    };
    const state = {
      recipes: [
        {
          id: 1,
          name: 'shalla',
          method: 'sffdsfd'
        },
        {
          id: 2,
          name: 'shazlla',
          method: 'sffdxsfd'
        }
      ]
    };
    const newState = recipeReducer(state, action);
    expect(newState).toEqual({
      recipes: [
        {
          id: 2,
          name: 'shazlla',
          method: 'sffdxsfd'
        }
      ],
      "deleted": true,
      "totalContent": 1
    });
  });
  it('should handle errors for creating recipes', () => {
    const error = {};
    const action = {
      type: types.CREATE_RECIPE_FAILURE,
      error
    };
    const newState = recipeReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        deleted: false,
        error
      }
    });
  });
  it('should edit recipes', () => {
    const editedRecipe = [];
    const action = {
      type: types.EDIT_RECIPE_SUCCESS,
      editedRecipe
    };
    const newState = recipeReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{
        deleted: false,
        totalContent: 0,
        recipes: editedRecipe
      }
    });
  });
});
