// /* eslint-disable */
import models from '../models';

console.log(models);

const review = models.Review;


/**
 *
 *
 * @class Reviews
 */
class Reviews {
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Reviews
   */
  postReview(req, res) {
    const data = req.body.data;
    const recipeId = req.params.recipeId;
    // const userId = req.body.userId;
    const currentUser = req.currentUser.id;

    if (isNaN(recipeId)) {
      return res.status(400).send({ message: 'Recipe id is not a number'})
    }
    if (!recipeId) {
      return res.status(400).send({ message: 'You need to put in the recipe ID' });
    } else if (!data) {
      return res.status(400).send({ message: 'You need to put a review!' });
    }
    review.create({
      data,
      recipeId,
      userId: currentUser
    })
      .then((reviewed) => {
        res.status(201).send({ message: 'Your review has been added', reviewed });
      })
      .catch(e => res.status(400).send({ message: 'Error creating review' }));
    return this;
  }
}

export default Reviews;
