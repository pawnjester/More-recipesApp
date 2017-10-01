/* eslint-disable */
import express from 'express';
import Recipes from '../controllers/recipes';
import Reviews from '../controllers/reviews';
// import User from '../controllers/users';
const userController = require('../controllers/users');



const recipeController = new Recipes();
const reviewController = new Reviews();
// const userController = new User();

const router = express.Router();

// router.get('/', recipeController.getRecipe);
// router.post('/', recipeController.addRecipe);
// router.put('/:recipeid', recipeController.modifyRecipe);
// router.delete('/:recipeId', recipeController.deleteRecipe);
// router.get('/:recipeId', recipeController.getRecipesbyId);
// router.post('/:recipeId/reviews', reviewController.postRecipe);
router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);



export default router;
