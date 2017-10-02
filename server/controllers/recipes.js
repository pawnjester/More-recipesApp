/* eslint-disable */
import models from '../models';

console.log(models);

const recipe = models.Recipe;

export class Recipes {
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

    recipe.create ({
      name,
      Ingredients,
      method,
      userId: req.body.userId
    })
    .then(recipe => {
      res.status(201).send({message: "Recipe has been created", recipe})
    })
    .catch(error => res.status(500).json({
        success: false,
        message: 'Recipe cannot be created' }))
    return this;
  }


  modifyRecipe(req, res) {
    const recipeId = req.params.recipeId;
    recipe.findById(recipeId)
    .then(recipe => {
      if(!recipe) {
        return res.status(400).send({
          message: "Recipe not Found"
        })
      }
      recipe.update({
        name:req.body.name || recipe.name,
        Ingredients:req.body.Ingredients || recipe.Ingredients,
        method:req.body.method || recipe.method,
      })
      .then(() => res.status(201).send(recipe))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));

  }

  // deleteRecipe(req, res) {
  //   for (let i = 0; i < db.recipes.length; i++) {
  //     if (parseInt(db.recipes[i].id, 10) === parseInt(req.params.recipeId, 10)) {
  //       db.recipes.splice(i, 1);
  //       return res.status(200).send({ message: 'Recipe has been removed' });
  //     }
  //   }
  //   return res.status(404).send({ message: 'Recipe not found' });
  // }

  getRecipes(req, res) {
    recipe.findAll()
    .then(recipe => {
      if(recipe.length === 0) {
        return res.status(200).send({})
      }
      res.status(200).send(books)
    })
    .catch(e => res.status(400).send(e))

  }

  // getRecipe(req, res) {
  //   let returnData;
  //   if (req.query && req.query.sort) {
  //     if (req.query.order && req.query.order === 'asc') {
  //       db.recipes.sort((a, b) => { return a.upVotes - b.upVotes });
  //     }
  //     if (req.query.order && req.query.order === 'desc') {
  //       db.recipes.sort((a, b) => { return b.upVotes - a.upVotes });
  //     }
  //   }
  //   return res.status(200).send({ message: 'Welcome to More-Recipes Application, these are the recipes available', recipes: db.recipes });
  // }
}

export default Recipes;
