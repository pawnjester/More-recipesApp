import models from '../models';

const favorite = models.Favorite;
const recipe = models.Recipe;

/**
 * @class Favorite
 *
 * @export
 *
 */
export default class Favorite {
  /**
   * @description - Make a recipe a favorite
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof Favorite
   *
   * @returns {object} Class instance
   */
  addFavorite(req, res) {
    const userId = req.currentUser.id;
    const { recipeId } = req.params;
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
   * @description Get user favorite recipes record
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof Favorite
   *
   * @returns {object} Class instance
   */
  getAllFavorite(req, res) {
    const currentUser = req.currentUser.id;
    favorite.findAndCountAll({
      where: {
        userId: currentUser
      },
      include: [{
        model: recipe,
      }],
    })
      .then((all) => {
        const limit = 6;
        let offset = 0;
        const page = parseInt((req.query.page || 1), 10);
        const numberOfItems = all.count;
        const pages = Math.ceil(numberOfItems / limit);
        offset = limit * (page - 1);
        favorite.findAll({
          where: {
            userId: currentUser,
          },
          limit,
          offset,
          order: [
            ['id', 'DESC'],
          ],
          include: [{
            model: recipe,
          }],
        }).then((userFavorite) => {
          if (userFavorite) {
            if (userFavorite.length < 1) {
              return res.status(200).json({ statusCode: 200, message: 'There are no favorite recipes in collection' });
            }
            return res.status(200).json({
              statusCode: 200,
              message: 'the list of favorite recipes',
              NumberOfItems: numberOfItems,
              Limit: limit,
              Pages: pages,
              CurrentPage: page,
              userFavorite
            });
          }
        });
      })
      .catch(() => res.status(500).json({ statusCode: 500, error: 'Recipe cannot be retrieved' }));
    return this;
  }
  /**
 * @description delete favorite
 *
 * @param {Object} req - HTTP Request
 * @param {Object} res - HTTP Response
 *
 * @memberof Favorite
 *
 * @returns {object} Class instance
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
      .catch(() => res.status(500).json({ statusCode: 500, error: 'Error deleting Favorite recipe' }));
    return this;
  }
}
