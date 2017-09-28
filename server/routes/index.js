import express from 'express';
import Recipes from '../controllers/recipes';
import Reviews from '../controllers/reviews';
import UpVotes from '../controllers/upvotes';


const recipeController = new Recipes();
const reviewController = new Reviews();
const upvoteController = new UpVotes();

let router = express.Router();

router.get('/', recipeController.getRecipe);
router.post('/', recipeController.addRecipe);
router.put('/:recipeid', recipeController.modifyRecipe);
router.delete('/:recipeId', recipeController.deleteRecipe);
router.get('/:recipeId', recipeController.getRecipesbyId);
router.post('/:recipeId/reviews', reviewController.postRecipe);
// router.get('/?sort=upvotes&order=des', upvoteController.upVote);



export default router;