// /* eslint-disable */
import express from 'express';
import Recipes from '../controllers/recipes';
import Reviews from '../controllers/reviews';
import Favorite from '../controllers/favorites';
import Vote from '../controllers/votes';
import User from '../controllers/users';
import authenticate from '../middleware/authenticate';


const recipeController = new Recipes();
const reviewController = new Reviews();
const favoriteController = new Favorite();
const userController = new User();
const voteController = new Vote();


const router = express.Router();

router.get('/', recipeController.getRecipes);
router.post('/', authenticate, recipeController.addRecipe);
router.put('/:recipeId', authenticate, recipeController.modifyRecipe);
router.delete('/:recipeId', authenticate, recipeController.deleteRecipe);
router.post('/:recipeId/reviews', authenticate, reviewController.postReview);
router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/me', authenticate, userController.me);
router.post('/:recipeId/favorite', authenticate, favoriteController.addFavorite);
router.get('/:userId/favorite', authenticate, favoriteController.getAllFavorite);
router.post('/:recipeId/upvote', authenticate, voteController.upvote);
router.post('/:recipeId/downvote', authenticate, voteController.downvote);


export default router;
