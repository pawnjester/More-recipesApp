// /* eslint-disable */
import express from 'express';
import Recipes from '../controllers/recipes';
import Reviews from '../controllers/reviews';
import Favorite from '../controllers/favorites';
import User from '../controllers/users';
import authenticate from '../middleware/authenticate';


const recipeController = new Recipes();
const reviewController = new Reviews();
const favoriteController = new Favorite();
const userController = new User();

const router = express.Router();

router.get('/', recipeController.getRecipes);
router.post('/', authenticate, recipeController.addRecipe);
router.put('/:recipeId', authenticate, recipeController.modifyRecipe);
router.delete('/:recipeId', authenticate, recipeController.deleteRecipe);
// router.get('/:recipeId', recipeController.getRecipesbyId);
router.post('/:recipeId/reviews', authenticate, reviewController.postReview);
router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/me', authenticate, userController.me);
router.post('/:recipeId/favorite', authenticate, favoriteController.addFavorite);


export default router;
