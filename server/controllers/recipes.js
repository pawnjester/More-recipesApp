import models from '../models';

const recipe = models.Recipe;


/**
 *
 *
 * @export
 * @class Recipes
 */
export class Recipes {
  /**
   * Add Recipe record
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @returns {object} Class instance
   * @memberof Recipe
   */
  addRecipe(req, res) {
    const name = req.body.name.trim().toLowerCase();
    const Ingredients = req.body.Ingredients.trim().toLowerCase();
    const { method } = req.body;
    const currentUser = req.currentUser.id;

    if (!name) {
      return res.status(400).send({ error: 'You need to fill in a name of the recipe' });
    } else if (!Ingredients) {
      return res.status(400).send({ error: 'You need to fill in the Ingredients' });
    } else if (!method) {
      return res.status(400).send({ error: 'You need to fill in the method of preparation ' });
    }

    recipe.create({
      name,
      Ingredients,
      method,
      userId: currentUser,
      upVotes: req.body.upVotes,
      downVotes: req.body.downVotes
    })
      .then((recipe) => {
        res.status(201).send({ message: 'Recipe has been created', recipe });
      })
      .catch(error => res.status(500).json({
        success: false,
        message: 'Recipe cannot be created'
      }));
    return this;
  }


  /**
   * Modify Recipe record
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @returns {object} Class instance
   * @memberof Recipe
   */
  modifyRecipe(req, res) {
    const recipeId = req.params.recipeId;
    if (isNaN(recipeId)) {
      return res.status(400).send({ message: 'Recipe id is not a number' });
    }
    recipe.findById(recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(400).send({
            message: `Recipe not Found with ${recipeId}`
          });
        }
        recipe.update({
          name: req.body.name || recipe.name,
          Ingredients: req.body.Ingredients || recipe.Ingredients,
          method: req.body.method || recipe.method,
        })
          .then(() => res.status(201).send(recipe))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
    return this;
  }

  /**
   * Delete Recipe record
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @returns {object} Class instance
   * @memberof Recipe
   */
  deleteRecipe(req, res) {
    const recipeId = req.params.recipeId;
    if (isNaN(recipeId)) {
      return res.status(400).send({ message: 'Recipe id is not a number' });
    }
    recipe.findById(recipeId)
      .then((deletedRecipe) => {
        if (!deletedRecipe) {
          return res.status(400).send({
            message: `Recipe not found with id : ${recipeId}`
          });
        }
        recipe
          .destroy({
            where: {
              id: recipeId,
            }
          })
          .then(() => res.status(200).send({ message: 'This recipe has been deleted' }));
      })
      .catch(e => res.status(400).send({ message: 'Error deleting recipe' }));
    return this;
  }


  /**
   * Get Recipe record
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @returns {object} Class instance
   * @memberof Recipe
   */
  getRecipes(req, res) {
    if (req.query && req.query.sort) {
      if (req.query.order && req.query.order === 'desc') {
        recipe.findAll({
          order: [
            ['upVotes', 'DESC']
          ]
        })
          .then((orderedRecipe) => {
            if (!orderedRecipe) {
              return res.status(400).send({ message: 'No recipe found' });
            }
            return res.status(201).send({
              message: 'Recipe(s) found',
              recipe: orderedRecipe
            });
          })
          .catch((e) => res.status(400).send({ message: 'Error sorting recipes' }));
      }
    } else {
      recipe.findAll()
        .then((recipe) => {
          if (recipe.length === 0) {
            return res.status(404).send({});
          }
          res.status(200).send({ message: 'Welcome to More-Recipes, these are the recipes available', recipe });
        })
        .catch(e => res.status(400).send(e));
    }

    return this;
  }

  /**
   * get recipe by id
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @returns {object} Class instance
   * @memberof Vote
   */

  getRecipeById(req, res) {
    const recipeId = req.params.recipeId;
    recipe.findById(recipeId)
      .then((found) => {
        if (!found) {
          return res.status(404).json({ message: `Recipe with id: ${recipeId} does not exist` });
        }
        return res.status(200).json({ message: `Recipe with id: ${recipeId} was found`, found });
      });
  }
}

export default Recipes;
