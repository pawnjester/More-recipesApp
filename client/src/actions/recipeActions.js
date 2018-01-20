// import axios from 'axios';
// import { CREATE_RECIPE_SUCCESS } from './types';

// const createRecipe = values => dispatch => axios.post('/api/v1/recipes', values)

//   .then((response) => {
//     dispatch({ type: CREATE_RECIPE_SUCCESS, payload: response.data });
//   })
//   .catch((error) => {
//     console.log(error.response);
//   });

// export default createRecipe;


import axios from 'axios';
import { CREATE_RECIPE_SUCCESS, CREATE_RECIPE_FAILURE } from './types';

const addRecipeSucess = newRecipe => ({
  type: CREATE_RECIPE_SUCCESS,
  newRecipe,
});

const addRecipeFailure = error => ({
  type: CREATE_RECIPE_FAILURE,
  error,
});


const createRecipe = data => dispatch => axios
  .post('/api/v1/recipes', data)
  .then((response) => {
    console.log('>>>,<<<<', response);
    const recipess = response.data.recipe;
    console.log('////', recipess);
    dispatch(addRecipeSucess(recipess));
    console.log('works....')
  })
  .catch((error) => {
    console.log('error?>>', error);
    dispatch(addRecipeFailure(error.response));
  });

export default createRecipe;
