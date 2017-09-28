import express from 'express';
import Recipes from '../controllers/recipes';
import Reviews from '../controllers/reviews';
import Upvotes from '../controllers/upvotes';


const recipeController = new Recipes();
const reviewController = new Reviews();
const upvoteController = new Upvotes();

let router = express.Router();

router.get('/', recipeController.getRecipe);
router.post('/', recipeController.addRecipe);
router.put('/:recipeid', recipeController.modifyRecipe);
router.delete('/:recipeId', recipeController.deleteRecipe);
router.get('/:recipeId', recipeController.getRecipesbyId);
router.post('/:recipeId/reviews', recipeController.postRecipe);


export default router;