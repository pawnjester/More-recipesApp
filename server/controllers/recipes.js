// /* eslint-disable */
import models from '../models';

console.log(models);

const recipe = models.Recipe;


/**
 *
 *
 * @export
 * @class Recipes
 */
export class Recipes {
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Recipes
   */
  addRecipe(req, res) {
    const name = req.body.name.trim().toLowerCase();
    const Ingredients = req.body.Ingredients.trim().toLowerCase();
    const method = req.body.method;
    const currentUser = req.currentUser.id;

    if (!name) {
      return res.status(400).send({ error: 'You need to fill in a name of the recipe' })
    } else if (!Ingredients) {
      return res.status(400).send({ error: 'You need to fill in the Ingredients' })
    } else if (!method) {
      return res.status(400).send({ error: 'You need to fill in the method of preparation ' })
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
        res.status(201).send({ message: 'Recipe has been created', recipe })
      })
      .catch(error => res.status(500).json({
        success: false,
        message: 'Recipe cannot be created'
      }));
    return this;
  }


  /**
   *
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Recipes
   */
  modifyRecipe(req, res) {
    const recipeId = req.params.recipeId;
    if (isNaN(recipeId)) {
      return res.status(400).send({ message: 'Recipe id is not a number' });
    }
    recipe.findById(recipeId)
      .then(recipe => {
        if (!recipe) {
          return res.status(400).send({
            message: `Recipe not Found with ${recipeId}`
          })
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
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Recipes
   */
  deleteRecipe(req, res) {
    const recipeId = req.params.recipeId;
    if (isNaN(recipeId)) {
      return res.status(400).send({ message: 'Recipe id is not a number'});
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
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Recipes
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
          .catch((e) => { return res.status(400).send({ message: 'Error sorting recipes' }); });

      }
    } else {
      recipe.findAll()
        .then((recipe) => {
          if (recipe.length === 0) {
            return res.status(404).send({});
          }
          res.status(200).send({ message: 'Welcome to More-Recipes', recipe });
        })
        .catch(e => res.status(400).send(e));
    }

    return this;
  }
}

export default Recipes;
