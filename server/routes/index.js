import express from 'express';
import Recipes from '../controllers/recipeController';
import Reviews from '../controllers/reviewController';
import Favorite from '../controllers/favoriteController';
import Vote from '../controllers/voteController';

import Validation from '../middleware/validation';
import authenticate from '../middleware/authenticate';


const recipeController = new Recipes();
const reviewController = new Reviews();
const favoriteController = new Favorite();
const voteController = new Vote();


const router = express.Router();

router.get('/', recipeController.getRecipes, recipeController.getTopRecipes, recipeController.getRecipesBySearch);
router.post('/', authenticate, Validation.addRecipeValidation, recipeController.addRecipe);
router.get('/favorite', authenticate, favoriteController.getAllFavorite);
router.put('/:recipeId', authenticate, Validation.recipeId, Validation.editRecipeValidation, recipeController.modifyRecipe);
router.delete('/:recipeId', authenticate, Validation.recipeId, recipeController.deleteRecipe);
router.get('/userRecipe', authenticate, recipeController.getUserRecipe);
router.get('/most-favorites', recipeController.listMostFavoritedRecipes);
router.get('/:recipeId', authenticate, Validation.recipeId, recipeController.getRecipeById);
router.post('/:recipeId/reviews', authenticate, Validation.recipeId, Validation.reviewContent, reviewController.postReview);
router.get('/:recipeId/reviews', authenticate, Validation.recipeId, reviewController.getReviewById);
router.delete('/:reviewId/reviews', authenticate, Validation.reviewId, reviewController.deleteReview);
router.post('/:recipeId/favorite', authenticate, Validation.recipeId, favoriteController.addFavorite);
router.delete('/:favoriteId/favorite', authenticate, Validation.favoriteId, favoriteController.deleteFavorite);
router.post('/:recipeId/upvote', Validation.recipeId, authenticate, voteController.upvote);
router.post('/:recipeId/downvote', Validation.recipeId, authenticate, voteController.downvote);


export default router;
