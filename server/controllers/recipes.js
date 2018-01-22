import models from '../models';

const recipe = models.Recipe;
const review = models.Review;
const user = models.User;
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
    let ingredients;

    if (req.body.name) {
      name = req.body.name.trim().toLowerCase();
    }
    if (req.body.ingredients) {
      ingredients = req.body.ingredients.trim().toLowerCase();
    }
    const { method } = req.body;
    const { cookingTime } = req.body;

    const currentUser = req.currentUser.id;

    if (!name) {
      return res.status(406).json({ statusCode: 406, error: 'You need to fill in a name of the recipe' });
    } else if (!ingredients) {
      return res.status(406).json({ statusCode: 406, error: 'You need to fill in the Ingredients' });
    } else if (!method) {
      return res.status(406).json({ statusCode: 406, error: 'You need to fill in the method of preparation ' });
    } else if (!ingredients && !name && !method) {
      return res.status(406).json({ statusCode: 406, error: 'Please enter the required details (name, Ingredients and method)' });
    } else if (Number.isNaN(cookingTime)) {
      return res.status(422).json({ statusCode: 422, error: 'Cooking time should be a number' });
    }

    recipe.findOne({
      where: {
        $and: [
          {
            name,
          },
          {
            userId: currentUser,
          },
        ],

      },
    })
      .then((RecipeFound) => {
        if (RecipeFound) {
          return res.status(409).json({
            statusCode: 409,
            error: 'You cannot create the same recipe twice',
          });
        }
        return recipe.create({
          name,
          ingredients,
          method,
          userId: currentUser,
          upVotes: req.body.upVotes,
          downVotes: req.body.downVotes,
          imageUrl: req.body.imageUrl || 'https://res.cloudinary.com/digr7ls7o/image/upload/v1516455539/no-img_hdhkpi.png',
          cookingTime,
        })
          .then((recipe) => {
            res.status(201).json({ statusCode: 201, message: 'Recipe has been created', recipe });
          });
      })
      .catch(() => res.status(500).json({
        statusCode: 500,
        success: false,
        error: 'shit, something went wrong',
      }));
    return this;
  }


  /**
   * Modify Recipe record
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @returns {object} Class instance
   *
   * @memberof Recipe
   */
  modifyRecipe(req, res) {
    const { recipeId } = req.params;
    const currentUser = req.currentUser.id;
    if (isNaN(recipeId)) {
      return res.status(406).json({ statusCode: 406, error: 'Recipe id is not a number' });
    }
    recipe.findOne({
      where: {
        $and: [
          {
            id: recipeId,
          },
          {
            userId: currentUser,
          },
        ],
      },

    })
      .then((recipe) => {
        if (!recipe) {
          return res.status(400).json({
            statusCode: 400,
            error: `Recipe not Found with ${recipeId}`,
          });
        }
        recipe.update({
          name: req.body.name || recipe.name,
          ingredients: req.body.ingredients || recipe.ingredients,
          method: req.body.method || recipe.method,
          imageUrl: req.body.imageUrl || recipe.imageUrl,
          cookingTime: req.body.cookingTime || recipe.cookingTime
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
   *
   * @returns {object} Class instance
   *
   * @memberof Recipe
   */
  deleteRecipe(req, res) {
    const { recipeId } = req.params;
    const currentUser = req.currentUser.id;
    if (isNaN(recipeId)) {
      return res.status(400).json({ statusCode: 400, error: 'Recipe id is not a number' });
    }
    recipe.findOne({
      where: {
        $and: [
          {
            id: recipeId,
          },
          {
            userId: currentUser,
          },
        ],
      },

    })
      .then((deletedRecipe) => {
        if (!deletedRecipe) {
          return res.status(400).json({
            statusCode: 400,
            error: `Recipe not found with id : ${recipeId}`,
          });
        }
        recipe
          .destroy({
            where: {
              id: recipeId,
            },
          })
          .then(() => res.status(200).json({ statusCode: 200, message: 'This recipe has been deleted' }));
      })
      .catch(() => res.status(500).json({ statusCode: 500, error: 'Error deleting recipe' }));
    return this;
  }


  /**
   * Get Recipe record
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @returns {object} Class instance
   *
   * @memberof Recipe
   */
  getRecipes(req, res) {
    if (req.query && req.query.sort) {
      if (req.query.order && req.query.order === 'desc') {
        recipe.findAll({
          order: [
            ['upVotes', 'DESC'],
          ],
          limit: 3,
        })
          .then((orderedRecipe) => {
            if (!orderedRecipe) {
              return res.status(400).json({ statusCode: 400, message: 'No recipe found' });
            }
            return res.status(201).json({
              statusCode: 201,
              message: 'Recipe(s) found',
              recipe: orderedRecipe,
            });
          })
          .catch(() => res.status(500).json({ statusCode: 500, message: 'Error sorting recipes' }));
      }
    } else if (req.query.search && req.query.limit) {
      const limitValue = req.query.limit || 30;
      const search = req.query.search.split(' ');

      const ingredientsResp = search.map(value => ({ ingredients: { $iLike: `%${value}%` } }));
      const respName = search.map(value => ({ name: { $iLike: `%${value}%` } }));

      recipe.findAll({
        where: {
          $or:
          ingredientsResp.concat(respName),
        },
        order: [
          ['id', 'ASC'],
        ],
        limit: limitValue,
      })
        .then((searchResults) => {
          if (searchResults.length <= 0) {
            return res.status(400).json({ statusCode: 400, message: 'Recipe(s) do not match your search result' });
          }
          return res.status(200).json({ statusCode: 200, message: 'The results found', searchResults });
        });
    } else {
      recipe.findAndCountAll().then((all) => {
        const limit = parseInt((req.query.limit || 6), 10);
        let offset = 0;
        const page = parseInt((req.query.page || 1), 10);
        const numberOfItems = all.count;
        const pages = Math.ceil(numberOfItems / limit);
        offset = limit * (page - 1);
        recipe.findAll({
          limit,
          offset,
          order: [
            ['id', 'DESC'],
          ],
          include: [
            { model: user, attributes: ['username', 'email'] },
          ],
        })
          .then((recipes) => {
            if (recipes) {
              if (recipes.length < 1) {
                return res.status(404).json({ statusCode: 404, error: 'There are currently no recipes in collection' });
              }
              return res.status(200).json({
                NumberOfItems: numberOfItems,
                Limit: limit,
                Pages: pages,
                CurrentPage: page,
                recipes,
              });
            }
          });
      }).catch(error => res.status(500).json(error));
    }

    return this;
  }

  /**
   * get recipe by id
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @returns {object} Class instance
   * @memberof Vote
   */
  getRecipeById(req, res) {
    const { recipeId } = req.params;
    recipe.findOne({
      where: { id: recipeId },
      include: [
        { model: user, attributes: ['username', 'email'] },
        {
          model: review,
          attributes: ['id', 'data', 'createdAt'],
          include: [
            { model: user, atrributes: ['username', 'profileImg'] },
          ],
        },
      ],
    })
      .then((singleRecipe) => {
        if (!singleRecipe) {
          return res.status(404).json({ statusCode: 404, error: `Recipe with id: ${recipeId} does not exist` });
        }
        return res.status(200).json({ statusCode: 200, message: `Recipe with id: ${recipeId} was found`, singleRecipe });
      })
      .catch(error => res.status(500).json(error));
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
  getUserRecipe(req, res) {
    recipe.findAndCountAll({
      where: {
        userId: req.currentUser.id,
      },
    }).then((all) => {
      const limit = 6;
      let offset = 0;
      const page = parseInt((req.query.page || 1), 10);
      const numberOfItems = all.count;
      const pages = Math.ceil(numberOfItems / limit);
      offset = limit * (page - 1);
      recipe.findAll({
        where: {
          userId: req.currentUser.id,
        },
        limit,
        offset,
        order: [
          ['id', 'DESC'],
        ],
        include: [
          { model: user, attributes: ['username', 'email'] },
        ],
      })
        .then((recipes) => {
          if (recipes) {
            if (recipes.length < 1) {
              return res.status(200).json({ statusCode: 200, message: 'There are currently no recipes in collection' });
            }
            return res.status(200).json({
              NumberOfItems: numberOfItems,
              Limit: limit,
              Pages: pages,
              CurrentPage: page,
              recipes,
            });
          }
        });
    }).catch(error => res.status(500).json(error));
    return this;
  }
}

export default Recipes;
