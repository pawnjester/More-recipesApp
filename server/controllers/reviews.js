import models from '../models';

const review = models.Review;
const recipe = models.Recipe


/**
 *
 *
 * @class Reviews
 */
class Reviews {
  /**
   * Add review to user recipe
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

    if (isNaN(recipeId)) {
      return res.status(406).json({ statusCode: 406, error: 'Recipe id is not a number' });
    }
    if (!recipeId) {
      return res.status(406).json({ statusCode: 406, error: 'You need to put in the recipe ID' });
    } else if (!data) {
      return res.status(406).json({ statusCode: 406, error: 'You need to put a review!' });
    }
    review.create({
      data,
      recipeId,
      userId: currentUser,
    })
      .then((reviewed) => {
        res.status(201).json({ statusCode: 201, message: 'Your review has been added', reviewed });
      })
      .catch(() => { res.status(500).json({ statusCode: 500, message: 'Error creating review' }); });
    return this;
  }
}

export default Reviews;
