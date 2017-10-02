// import db from '../models/db';
/* eslint-disable */

class Recipes {
  addRecipe(req, res) {
    const name = req.body.name.trim().toLowerCase();
    const Ingredients = req.body.Ingredients.trim().toLowerCase();
    const method = req.body.method;

    if (!name) {
      return res.status(400).send({ error: "You need to fill in a name of the recipe" })
    } else if (!Ingredients) {
      return res.status(400).send({ error: "You need to fill in the Ingredients" })
    } else if (!method) {
      return res.status(400).send({ error: "You need to fill in the method of preparation " })
    }

    return Recipe.create ({
      name,
      Ingredients,
      method,
      userId: req.userId
    })
    .then(recipe => {
      res.status(201).send({message: "Recipe has been created", recipe})
    })
    .catch(error => res.status(500).json({
        success: false,
        message: 'Recipe cannot be created' }))
  }


  modifyRecipe(req, res) {
    for (let i = 0; i < db.recipes.length; i++) {
      if (parseInt(db.recipes[i].id, 10) === parseInt(req.params.recipeid, 10)) {
        db.recipes[i].name = req.body.name;
        db.recipes[i].ingredients = req.body.ingredients;
        db.recipes[i].method = req.body.method;
        db.recipes[i].upVotes = req.body.upVotes;
        return res.status(200).send({ message: 'Recipe has been modified' });
      }
    }
    return res.status(404).send({ message: 'Recipe not found' });
  }

  deleteRecipe(req, res) {
    for (let i = 0; i < db.recipes.length; i++) {
      if (parseInt(db.recipes[i].id, 10) === parseInt(req.params.recipeId, 10)) {
        db.recipes.splice(i, 1);
        return res.status(200).send({ message: 'Recipe has been removed' });
      }
    }
    return res.status(404).send({ message: 'Recipe not found' });
  }

  getRecipesbyId(req, res) {
    for (let i = 0; i < db.recipes.length; i++) {
      if (parseInt(db.recipes[i].id, 10) === parseInt(req.params.recipeId, 10)) {
      // global.recipes.splice(1,1)
        return res.status(200).send({ message: 'Recipe has been found', recipes: db.recipes[i] });
      }
    }
    return res.status(404).send({ message: 'Recipe not found' });

  }

  getRecipe(req, res) {
    let returnData;
    if (req.query && req.query.sort) {
      if (req.query.order && req.query.order === 'asc') {
        db.recipes.sort((a, b) => { return a.upVotes - b.upVotes });
      }
      if (req.query.order && req.query.order === 'desc') {
        db.recipes.sort((a, b) => { return b.upVotes - a.upVotes });
      }
    }
    return res.status(200).send({ message: 'Welcome to More-Recipes Application, these are the recipes available', recipes: db.recipes });
  }
}

export default Recipes;
