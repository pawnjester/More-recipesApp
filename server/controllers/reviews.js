// import db from '../models/db';

/* eslint-disable */
import models from '../models';

console.log(models);

const review = models.Review;


class Reviews {
  postReview(req,res) {
    const data = req.body.data;
    const recipeId = req.params.recipeId;
    const userId = req.body.userId

    if(!recipeId) {
      return res.status(400).send({message: "You need to put in the recipe ID"})
    } else if(!data) {
      return res.status(400).send({message: "You need to put a review!"})
    }
    review.create({
      data,
      recipeId,
      userId
    })
    .then(rev => {
      res.status(201).send({message: "Your review has been added", rev});
    })
    .catch(e => res.status(400).send({message: "Error creating review"}));
    return this;
  }
}

export default Reviews;
