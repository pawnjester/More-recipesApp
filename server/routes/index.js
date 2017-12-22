import express from 'express';
import Recipes from '../controllers/recipes';
import Reviews from '../controllers/reviews';
import Favorite from '../controllers/favorites';
import Vote from '../controllers/votes';

import authenticate from '../middleware/authenticate';


const recipeController = new Recipes();
const reviewController = new Reviews();
const favoriteController = new Favorite();
const voteController = new Vote();


const router = express.Router();

router.get('/', authenticate, recipeController.getRecipes);
router.post('/', authenticate, recipeController.addRecipe);
router.put('/:recipeId', authenticate, recipeController.modifyRecipe);
router.delete('/:recipeId', authenticate, recipeController.deleteRecipe);
router.get('/:recipeId', recipeController.getRecipeById);
router.post('/:recipeId/reviews', authenticate, reviewController.postReview);
router.get('/:recipeId/reviews', authenticate, reviewController.getReviewById);
router.post('/:recipeId/favorite', authenticate, favoriteController.addFavorite);
router.get('/:userId/favorite', authenticate, favoriteController.getAllFavorite);
router.post('/:recipeId/vote', authenticate, voteController.votes);
// router.post('/:recipeId/downvote', authenticate, voteController.downvote);

export default router;
