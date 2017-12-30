import models from '../models';

const recipe = models.Recipe;

const upvotes = models.Upvote;
const downvotes = models.Downvote;


/**
 * Class Definition for the Vote Object
 *
 * @export
 * @class Vote
 */
export default class Votes {
  /**
   * up-vote a recipe
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @returns {object} Class instance
   * @memberof Vote
   */
  upvote(req, res) {
    const currentUser = req.currentUser.id;
    const { recipeId } = req.params;
    recipe.findById(recipeId)
      .then((recipeFound) => {
        if (!recipeFound) {
          return res.status(404).json({ error: 'You cannot upvote this recipe' });
        }
        // check if it has been upvoted
        upvotes.findOne({
          where: {
            userId: currentUser,
            $and: {
              recipeId,
            },
          },
          attributes: ['id', 'recipeId', 'userId'],
        })
          .then((foundUpvote) => {
            if (!foundUpvote) {
              downvotes.findOne({
                where: {
                  userId: currentUser,
                  $and: { recipeId },
                },
                attributes: ['id', 'recipeId', 'userId'],
              })
                .then((foundDownvote) => {
                  if (!foundDownvote) {
                    upvotes.create({
                      recipeId,
                      userId: currentUser,
                    })
                      .then(() => {
                        recipe.findOne({
                          where: { id: recipeId },
                          include: [
                            { model: models.User, attributes: ['email'] },
                            { model: models.Review, attributes: ['id', 'data'] },
                          ],
                        })
                          .then((Recipe) => {
                            if (!Recipe) {
                              return res.status(500).json({
                                error: 'Recipe can\'t be upvoted',
                              });
                            }
                            if (Recipe) {
                              Recipe.increment('upVotes').then(() => {
                                Recipe.reload();
                              })
                                .then(() => res.status(200).json({
                                  status: 'success',
                                  message: 'recipe has been upvoted',
                                  Recipe,
                                }));
                            }
                          });
                      });
                  }
                  if (foundDownvote) {
                    downvotes.destroy({
                      where: {
                        recipeId,
                        $and: { userId: currentUser },
                      },
                    })
                      .then(() => {
                        upvotes.create({
                          recipeId,
                          userId: currentUser,
                        })
                          .then(() => {
                            recipe.findOne({
                              where: { id: recipeId },
                              include: [
                                { model: models.User, attributes: ['email'] },
                                { model: models.Review, attributes: ['id', 'data'] },
                              ],
                            })
                              .then((Recipe) => {
                                if (Recipe) {
                                  Recipe.increment('upVotes').then(() => {
                                    Recipe.decrement('downVotes').then(() => {
                                      Recipe.reload();
                                    }).then(() => res.status(200).send({
                                      status: 'success',
                                      message: 'Recipe has been upvoted',
                                      Recipe,
                                    }));
                                  });
                                }
                                if (!Recipe) {
                                  return res.status(500).json({ error: 'Recipe could not be upvoted' });
                                }
                              });
                          });
                      });
                  }
                });
            }
            if (foundUpvote) {
              upvotes.destroy({
                where: { userId: currentUser },
                $and: { recipeId },
              })
                .then(() => {
                  recipe.findOne({
                    where: { id: recipeId },
                    include: [
                      { model: models.User, attributes: ['email'] },
                      { model: models.Review, attributes: ['id', 'data'] },
                    ],
                  })
                    .then((Recipe) => {
                      Recipe.decrement('upVotes')
                        .then(() => Recipe.reload())
                        .then(() => res.status(200).json({
                          status: 'success',
                          message: 'upvote removed',
                          Recipe,
                        }));
                    });
                });
            }
          });
      })
      .catch(() => res.status(500).json({ message: 'Server error, unable to complete vote' }));
    return this;
  }
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {obj} any
   * @memberof Vote
   */
  downvote(req, res) {
    const currentUser = req.currentUser.id;
    const { recipeId } = req.params;
    recipe.findById(recipeId)
      .then((recipeFound) => {
        if (!recipeFound) {
          return res.status(404).json({ error: 'You cannot downvote this recipe' });
        }
        // check if it has been downvoted
        downvotes.findOne({
          where: {
            userId: currentUser,
            $and: {
              recipeId,
            },
          },
          attributes: ['id', 'recipeId', 'userId'],
        })
          .then((foundDownvote) => {
            if (!foundDownvote) {
              upvotes.findOne({
                where: {
                  userId: currentUser,
                  $and: { recipeId },
                },
                attributes: ['id', 'recipeId', 'userId'],
              })
                .then((foundUpvote) => {
                  if (!foundUpvote) {
                    downvotes.create({
                      recipeId,
                      userId: currentUser,
                    })
                      .then(() => {
                        recipe.findOne({
                          where: { id: recipeId },
                          include: [
                            { model: models.User, attributes: ['email'] },
                            { model: models.Review, attributes: ['id', 'data'] },
                          ],
                        })
                          .then((Recipe) => {
                            if (!Recipe) {
                              return res.status(500).json({
                                error: 'Recipe can\'t be downvoted',
                              });
                            }
                            if (Recipe) {
                              Recipe.increment('downVotes').then(() => {
                                Recipe.reload();
                              })
                                .then(() => res.status(200).json({
                                  status: 'success',
                                  message: 'recipe has been downvoted',
                                  Recipe,
                                }));
                            }
                          });
                      });
                  }
                  if (foundUpvote) {
                    upvotes.destroy({
                      where: {
                        recipeId,
                        $and: { userId: currentUser },
                      },
                    })
                      .then(() => {
                        downvotes.create({
                          recipeId,
                          userId: currentUser,
                        })
                          .then(() => {
                            recipe.findOne({
                              where: { id: recipeId },
                              include: [
                                { model: models.User, attributes: ['email'] },
                                { model: models.Review, attributes: ['id', 'data'] },
                              ],
                            })
                              .then((Recipe) => {
                                if (Recipe) {
                                  Recipe.increment('downVotes').then(() => {
                                    Recipe.decrement('upVotes').then(() => {
                                      Recipe.reload();
                                    }).then(() => res.status(200).send({
                                      status: 'success',
                                      message: 'Recipe has been downvoted',
                                      Recipe,
                                    }));
                                  });
                                }
                                if (!Recipe) {
                                  return res.status(500).json({ error: 'Recipe could not be downvoted' });
                                }
                              });
                          });
                      });
                  }
                });
            }
            if (foundDownvote) {
              downvotes.destroy({
                where: { userId: currentUser },
                $and: { recipeId },
              })
                .then(() => {
                  recipe.findOne({
                    where: { id: recipeId },
                    include: [
                      { model: models.User, attributes: ['email'] },
                      { model: models.Review, attributes: ['id', 'data'] },
                    ],
                  })
                    .then((Recipe) => {
                      Recipe.decrement('downVotes')
                        .then(() => Recipe.reload())
                        .then(() => res.status(200).json({
                          status: 'success',
                          message: 'downvote removed',
                          Recipe,
                        }));
                    });
                });
            }
          });
      })
      .catch(() => res.status(500).json({ message: 'Server error, unable to complete vote' }));
    return this;
  }
}
