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
   * @returns {object} Class instance
   * @memberof Favorite
   */
  addFavorite(req, res) {
    const userId = req.currentUser.id;
    const recipeId = req.params.recipeId;
    favorite.findOne({
      where: {
        recipeId,
        userId
      }
    })
      .then((fav) => {
        if (fav) {
          return res.status(201).send({ message: 'recipe is already a favorite' });
        }
        favorite.create({
          recipeId,
          userId,
        })
          .then((newfav) => {
            res.status(201).send({ message: `recipe with ${recipeId} has been added`, newfav });
          })
          .catch((err) => res.status(400).send({message: 'recipe could not be added to favorite',err:err.parent.detail }));
        return this;
      });
  }

  /**
   * Get user favorite recipes record
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @returns {object} Class instance
   * @memberof Favorite
   */
  getAllFavorite(req, res) {
    const currentUser = req.currentUser.id;
    const userId = req.params.userId;

    if (isNaN(userId)) {
      return res.status(400).send({ message: 'User id is not a number' });
    }
    if (currentUser != userId) {
      return res.status(400).send({ message: 'This is not your favorite' });
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
        res.status(200).send({ message: 'the list of recipes', userFavorite });
      })
      .catch(e => res.status(400).send({ message: 'Recipe cannot be retrieved'}));
    return this;
  }
}
