import models from '../models';
import mailer from '../helper/reviewMailer';

const review = models.Review;
const recipe = models.Recipe;
const user = models.User;


/**
 *
 *
 * @export
 *
 * @class Reviews
 *
 */
class Reviews {
  /**
   * @description Add review to user recipe
   *
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   *
   * @returns {object} Class instance
   *
   * @memberof Reviews
   */
  postReview(req, res) {
    const { data } = req.body;
    const { recipeId } = req.params;
    const currentUser = req.currentUser.id;
    let reviewer;
    review.create({
      data,
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
                  atrributes: ['username', 'profileImg'] },
              ],
            },

          ],
        })
          .then((reviewed) => {
            res.status(201).json({ statusCode: 201, message: 'Your review has been added', reviewed });
            // reviewed.Reviews.map((reviewOwner) => {
            //   reviewer = reviewOwner.User.username;
            // });
            // mailer(reviewed.User.username, reviewer, reviewed.User.email, data, reviewed.name);
          });
      })
      .catch(() => { res.status(500).json({ statusCode: 500, message: 'Error creating review' }); });
    return this;
  }
  /**
 * @description delete Review
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 *
 * @memberof Reviews
 *
 * @returns {object} Class instance
 */
  deleteReview(req, res) {
    const { reviewId } = req.params;
    const currentUser = req.currentUser.id;

    review.findOne({
      where: {
        id: reviewId,
        userId: currentUser
      }
    })
      .then((deletedReview) => {
        if (!deletedReview) {
          return res.status(400).json({ statusCode: 400, error: `Review not found with id : ${reviewId}` });
        }
        review.destroy({
          where: {
            id: reviewId,
          }
        })
          .then(() => {
            review.findAll()
              .then((reviews) => {
                res.status(200).json({ message: 'This review has been deleted', reviews });
              });
          })
          .catch(() => res.status(500).json({ statusCode: 500, error: 'Error deleting review ' }));
      });
    return this;
  }
  /**
 * @description get Review by id
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 *
 * @memberof Reviews
 *
 * @returns {object} Class instance
 */
  getReviewById(req, res) {
    const { recipeId } = req.params;

    recipe.findOne({
      where: {
        id: recipeId,
      },
    })
      .then((response) => {
        if (!response) {
          return res.status(400).json({ statusCode: 400, error: `Recipe not found with ${recipeId}` });
        }
        review.findAll({
          where: {
            recipeId,
          },
          include: [
            { model: user, attributes: ['username', 'profileImg'] },
          ],
        })
          .then(reviews => res.status(200).json({ statusCode: 200, message: 'Reviews found: ', reviews }));
      })
      .catch(() => res.status(500).json({ statusCode: 500, error: 'Recipe cannot be retrieved' }));
    return this;
  }
}

export default Reviews;
