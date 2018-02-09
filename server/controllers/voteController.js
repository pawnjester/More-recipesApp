import models from '../models';

const recipe = models.Recipe;
const user = models.User;
const review = models.Review;

const upvotes = models.Upvote;
const downvotes = models.Downvote;


/**
 * Class Definition for the Vote Object
 *
 * @export
 *
 * @class Vote
 */
export default class Votes {
  /**
   * @description up-vote a recipe
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @memberof Votes
   *
   * @returns {object} Class instance
   */
  upvote(req, res) {
    const currentUser = req.currentUser.id;
    const { recipeId } = req.params;

    recipe.findById(recipeId)
      .then((recipeFound) => {
        if (!recipeFound) {
          return res.status(404)
            .json({
              statusCode: 404,
              error: 'You cannot upvote this recipe'
            });
        }
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
                            { model: user, attributes: ['username', 'email'] },
                            {
                              model: review,
                              attributes: ['id', 'data', 'createdAt'],
                              include: [
                                {
                                  model: user,
                                  atrributes: ['username', 'profileImg']
                                },
                              ],
                            },

                          ],
                        })
                          .then((Recipe) => {
                            if (!Recipe) {
                              return res.status(500).json({
                                statusCode: 500,
                                error: 'Recipe can\'t be upvoted',
                              });
                            }
                            if (Recipe) {
                              Recipe.increment('upVotes').then(() => {
                                Recipe.reload();
                              })
                                .then(() => res.status(200).json({
                                  statusCode: 200,
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
                                { model: user, attributes: ['username', 'email'] },
                                {
                                  model: review,
                                  attributes: ['id', 'data', 'createdAt'],
                                  include: [
                                    {
                                      model: user,
                                      atrributes: ['username',
                                        'profileImg']
                                    },
                                  ],
                                },

                              ],
                            })
                              .then((Recipe) => {
                                if (Recipe) {
                                  Recipe.increment('upVotes').then(() => {
                                    Recipe.decrement('downVotes').then(() => {
                                      Recipe.reload();
                                    }).then(() => res.status(200).send({
                                      statusCode: 200,
                                      message: 'Recipe has been upvoted',
                                      Recipe,
                                    }));
                                  });
                                }
                                if (!Recipe) {
                                  return res.status(500)
                                    .json({
                                      statusCode: 500,
                                      error: 'Recipe could not be upvoted'
                                    });
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
                      { model: user, attributes: ['username', 'email'] },
                      {
                        model: review,
                        attributes: ['id', 'data', 'createdAt'],
                        include: [
                          {
                            model: user,
                            atrributes: ['username', 'profileImg']
                          },
                        ],
                      },

                    ],
                  })
                    .then((Recipe) => {
                      Recipe.decrement('upVotes')
                        .then(() => Recipe.reload())
                        .then(() => res.status(200).json({
                          statusCode: 200,
                          message: 'upvote removed',
                          Recipe,
                        }));
                    });
                });
            }
          });
      })
      .catch(() => res.status(500).json({
        statusCode: 500,
        error: 'Server error, unable to complete vote'
      }));
    return this;
  }
  /**
 * @description downvote a recipe
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 *
 * @memberof Votes
 *
 * @returns {object} Class instance
 */
  downvote(req, res) {
    const currentUser = req.currentUser.id;
    const { recipeId } = req.params;
    recipe.findById(recipeId)
      .then((recipeFound) => {
        if (!recipeFound) {
          return res.status(404).json({
            statusCode: 404,
            error: 'You cannot downvote this recipe'
          });
        }
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
                            { model: user, attributes: ['username', 'email'] },
                            {
                              model: review,
                              attributes: ['id', 'data', 'createdAt'],
                              include: [
                                {
                                  model: user,
                                  atrributes: ['username', 'profileImg']
                                },
                              ],
                            },

                          ],
                        })
                          .then((Recipe) => {
                            if (!Recipe) {
                              return res.status(500).json({
                                statusCode: 500,
                                error: 'Recipe can\'t be downvoted',
                              });
                            }
                            if (Recipe) {
                              Recipe.increment('downVotes').then(() => {
                                Recipe.reload();
                              })
                                .then(() => res.status(200).json({
                                  statusCode: 200,
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
                                { model: user, attributes: ['username', 'email'] },
                                {
                                  model: review,
                                  attributes: ['id', 'data', 'createdAt'],
                                  include: [
                                    {
                                      model: user,
                                      atrributes: ['username', 'profileImg']
                                    },
                                  ],
                                },

                              ],
                            })
                              .then((Recipe) => {
                                if (Recipe) {
                                  Recipe.increment('downVotes').then(() => {
                                    Recipe.decrement('upVotes').then(() => {
                                      Recipe.reload();
                                    }).then(() => res.status(200).send({
                                      statusCode: 200,
                                      message: 'Recipe has been downvoted',
                                      Recipe,
                                    }));
                                  });
                                }
                                if (!Recipe) {
                                  return res.status(500)
                                    .json({
                                      statusCode: 500,
                                      error: 'Recipe could not be downvoted'
                                    });
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
                      { model: user, attributes: ['username', 'email'] },
                      {
                        model: review,
                        attributes: ['id', 'data', 'createdAt'],
                        include: [
                          {
                            model: user,
                            atrributes: ['username', 'profileImg']
                          },
                        ],
                      },

                    ],
                  })
                    .then((Recipe) => {
                      Recipe.decrement('downVotes')
                        .then(() => Recipe.reload())
                        .then(() => res.status(200).json({
                          statusCode: 200,
                          message: 'downvote removed',
                          Recipe,
                        }));
                    });
                });
            }
          });
      })
      .catch(() => res.status(500)
        .json({
          statusCode: 500,
          error: 'Server error, unable to complete vote'
        }));
    return this;
  }
}
