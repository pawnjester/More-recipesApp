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
    let name;
    let Ingredients;

    if (req.body.name) {
      name = req.body.name.trim().toLowerCase();
    }
    if (req.body.ingredients) {
      Ingredients = req.body.ingredients.trim().toLowerCase();
    }
    const { method } = req.body;
    const currentUser = req.currentUser.id;

    if (!name) {
      return res.status(400).json({ statusCode: 400, error: 'You need to fill in a name of the recipe' });
    } else if (!Ingredients) {
      return res.status(400).json({ statusCode: 400, error: 'You need to fill in the Ingredients' });
    } else if (!method) {
      return res.status(400).json({ statusCode: 400, error: 'You need to fill in the method of preparation ' });
    } else if (!Ingredients && !name && !method) {
      return res.status(400).json({ statusCode: 400, error: 'Please enter the required details (name, Ingredients and method)' });
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
        res.status(201).json({ statusCode: 201, message: 'Recipe has been created', recipe });
      })
      .catch(() => res.status(500).json({
        statusCode: 500,
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
    const { recipeId } = req.params;
    if (isNaN(recipeId)) {
      return res.status(400).json({ message: 'Recipe id is not a number' });
    }
    recipe.findById(recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(400).json({
            statusCode: 400,
            message: `Recipe not Found with ${recipeId}`
          });
        }
        recipe.update({
          name: req.body.name || recipe.name,
          Ingredients: req.body.ingredients || recipe.Ingredients,
          method: req.body.method || recipe.method,
        })
          .then(() => res.status(201).json({ statusCode: 201, recipe }))
          .catch(error => res.status(500).json(error));
      })
      .catch(error => res.status(500).json(error));
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
    const { recipeId } = req.params;
    if (isNaN(recipeId)) {
      return res.status(400).json({ statusCode: 400, message: 'Recipe id is not a number' });
    }
    recipe.findById(recipeId)
      .then((deletedRecipe) => {
        if (!deletedRecipe) {
          return res.status(400).json({
            statusCode: 400,
            message: `Recipe not found with id : ${recipeId}`
          });
        }
        recipe
          .destroy({
            where: {
              id: recipeId,
            }
          })
          .then(() => res.status(200).json({ statusCode: 200, message: 'This recipe has been deleted' }));
      })
      .catch(() => res.status(500).json({ statusCode: 500, message: 'Error deleting recipe' }));
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
              return res.status(400).json({ statusCode: 400, message: 'No recipe found' });
            }
            return res.status(201).json({
              statusCode: 201,
              message: 'Recipe(s) found',
              recipe: orderedRecipe
            });
          })
          .catch(() => res.status(500).json({ statusCode: 500, message: 'Error sorting recipes' }));
      }
    } else if (req.query.search) {
      const search = req.query.search.split(' ');

      const ingredientsResp = search.map((value) => {
        return { ingredients: { $iLike: `%${value}%` } };
      });
      const respName = search.map((value) => {
        return { name: { $iLike: `%${value}%` } };
      });

      recipe.findAll({
        where: {
          $or:
          ingredientsResp.concat(respName)
        },
        order: [
          ['id', 'DESC']
        ]
      })
        .then((searchResults) => {
          if (searchResults.length <= 0) {
            return res.status(400).json({ statusCode: 400, message: 'Recipe(s) do not match your search result' });
          }
          return res.status(200).json({ statusCode: 200, message: 'The results found', searchResults });
        });
    } else {
      recipe.findAll()
        .then((recipe) => {
          if (recipe.length === 0) {
            return res.status(404).json({});
          }
          res.status(200).json({ statusCode: 200, message: 'Welcome to More-Recipes, these are the recipes available', recipe });
        })
        .catch(e => res.status(500).json(e));
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
    const { recipeId } = req.params;
    recipe.findById(recipeId)
      .then((found) => {
        if (!found) {
          return res.status(404).json({ statusCode: 404, message: `Recipe with id: ${recipeId} does not exist` });
        }
        return res.status(200).json({ statusCode: 200, message: `Recipe with id: ${recipeId} was found`, found });
      });
    return this;
  }
}

export default Recipes;
