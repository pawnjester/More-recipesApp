import db from '../models/db';

class Reviews {
  postRecipe(req,res) {
    for (let i = 0; i < db.recipes.length; i++) {
    if (parseInt(db.recipes[i].id, 10) === parseInt(req.params.recipeId, 10)) {
      db.recipes[i].review = req.body.review;
      // global.recipes[i].push(req.body);
      return res.status(200).send({ message: "Review has been added" });
    }
  }
  return res.status(200).send({ message: "Recipe not found" })
  }
}

export default Reviews;