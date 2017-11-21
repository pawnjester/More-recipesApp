import models from '../models';

const favorite = models.Favorite;
const recipe = models.Recipe;

/**
 *
 *
 * @export
 * @class Favorite
 */
export default class Favorite {
  /**
   * Make a recipe a favorite
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * 
   * @returns {object} Class instance
   * 
   * @memberof Favorite
   */
  addFavorite(req, res) {
    const userId = req.currentUser.id;
    const { recipeId } = req.params;
    if (isNaN(recipeId)) {
      return res.status(406).json({ statusCode: 406, error: 'Recipe id is not a number' });
    }
    recipe.findOne({
      where: {
        id: recipeId
      }
    })
      .then((found) => {
        if (!found) {
          return res.status(404).json({ statusCode: 404, error: `Recipe with id: ${recipeId} could not be found` });
        }

        favorite.findOne({
          where: {
            recipeId,
            userId
          }
        })
          .then((fav) => {
            if (fav) {
              return res.status(409).json({ statusCode: 409, error: 'recipe is already a favorite' });
            }
            favorite.create({
              recipeId,
              userId,
            })
              .then((newfav) => {
                res.status(201).json({ statusCode: 201, message: `recipe with ${recipeId} has been added`, newfav });
              })
              .catch(err => res.status(500).json({ statusCode: 500, error: 'recipe could not be added to favorite', err: err.parent.detail }));
            return this;
          });
      });
  }

  /**
   * Get user favorite recipes record
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * 
   * @returns {object} Class instance
   * 
   * @memberof Favorite
   */
  getAllFavorite(req, res) {
    const currentUser = req.currentUser.id;
    const { userId } = req.params;

    if (isNaN(userId)) {
      return res.status(400).json({ statusCode: 400, message: 'User id is not a number' });
    }
    if (currentUser != userId) {
      return res.status(400).json({ statuscode: 400, message: 'This is not your favorite' });
    }
    favorite.findAll({
      where: {
        userId
      },
      include: [{
        model: recipe,
        where: {
          userId
        },
      }]
    })
      .then((userFavorite) => {
        res.status(200).json({ statusCode: 200, message: 'the list of favorite recipes', userFavorite });
      })
      .catch(() => res.status(500).json({ statusCode: 500, message: 'Recipe cannot be retrieved' }));
    return this;
  }
}
