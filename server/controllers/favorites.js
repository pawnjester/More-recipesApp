import models from '../models';

const favorite = models.Favorite;
const recipe = models.Recipe;

/**
 *
 * @export
 *
 * @class Favorite
 */
export default class Favorite {
  /**
   * @description - Make a recipe a favorite
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
        id: recipeId,
      },
    })
      .then((found) => {
        if (!found) {
          return res.status(404).json({ statusCode: 404, error: `Recipe with id: ${recipeId} could not be found` });
        }

        favorite.findOne({
          where: {
            $and: [
              {
                recipeId,
              },
              { userId },
            ],
          },
        })
          .then((fav) => {
            if (fav) {
              favorite.destroy({
                where: {
                  $and: [
                    {
                      recipeId,
                    },
                    { userId },
                  ],
                },
              });
              recipe.findOne({
                where: {
                  id: recipeId,
                }
              }).then((recipeFound) => {
                recipeFound.decrement('favoriteCount').then(() => {
                  recipeFound.reload();
                });
              });
              return res.status(200).json({ statusCode: 200, message: 'Recipe removed from favorite list' });
            }
            favorite.create({
              recipeId,
              userId,
            })
              .then(() => {
                favorite.findOne({
                  where: {
                    $and: [
                      {
                        recipeId,
                      },
                      { userId },
                    ],
                  },
                }).then((favoriteRecipe) => {
                  recipe.findOne({
                    where: {
                      id: recipeId,
                    }
                  }).then((recipeFound) => {
                    recipeFound.increment('favoriteCount').then(() => {
                      recipeFound.reload();
                    });
                  });
                  return res.status(201).json({ statusCode: 201, message: 'recipe favorited', favoriteRecipe });
                });
              })
              .catch(err => res.status(500).json({ statusCode: 500, error: 'recipe could not be added to favorite', err: err.parent.detail }));
            return this;
          });
      });
    return this;
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
        userId,
      },
      include: [{
        model: recipe,
      }],
    })
      .then((userFavorite) => {
        res.status(200).json({ statusCode: 200, message: 'the list of favorite recipes', userFavorite });
      })
      .catch(() => res.status(500).json({ statusCode: 500, message: 'Recipe cannot be retrieved' }));
    return this;
  }
  /**
 *
 *
 * @param {any} req
 * @param {any} res
 * @memberof Favorite
 */
  deleteFavorite(req, res) {
    const currentUser = req.currentUser.id;
    const { favoriteId } = req.params;
    favorite.findOne({
      where: {
        userId: currentUser,
        id: favoriteId
      }
    })
      .then((favoriteFound) => {
        if (!favoriteFound) {
          return res.status(404).json({
            error: 'Favorite not found'
          });
        }
        return favorite.destroy({
          where: {
            id: favoriteId,
          }
        })
          .then(() => res.status(200).json({ statusCode: 200, message: 'This is no more your favorite' }));
      })
      .catch(error => console.log(error));
    return this;
  }
}
