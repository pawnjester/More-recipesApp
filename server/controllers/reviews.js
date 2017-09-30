import db from '../models/db';
/* eslint-disable */


class Reviews {
  postRecipe(req,res) {
    const review = req.body.review;
    if(!review) {
      return res.status(400).send({message: "Please enter a review"})
    }
    for (let i = 0; i < db.recipes.length; i++) {
    if (parseInt(db.recipes[i].id, 10) === parseInt(req.params.recipeId, 10)) {
      db.recipes[i].review = review;
      // db.recipes[i].push(req.body);      
      return res.status(200).send({ message: "Review has been added" });
    }
  }
  return res.status(200).send({ message: "Recipe not found" })
  }
}

export default Reviews;
