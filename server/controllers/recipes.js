import db from '../models/db';
/* eslint-disable */

class Recipes {
  addRecipe(req, res) {
    const id = req.body.id;
    const numberid = parseInt(id);
    const name = req.body.name;
    const ingredients = req.body.ingredients;
    const method = req.body.method;
    const upVotes = req.body.upVotes;

    if (!numberid) {
      return res.status(400).send({ statusCode: 400, message: 'Put in an id' });
    }
    if (!name) {
      return res.status(400).send({ statusCode: 400, message: 'Put in the name of the recipe' });
    }
    if (!ingredients) {
      return res.status(400).send({ statusCode: 400, message: 'Put in the ingredients' });
    }
    if (!method) {
      return res.status(400).send({ statusCode: 400, message: 'Method missing' });
    }
    if (!upVotes) {
      return res.status(400).send({ statusCode: 400, message: 'Please vote' });
    }

    if(db.recipes.length === 0) {
      db.recipes.id = 1
    }
    // db.recipes.id=recipes[recipes.length-1].id+1
    // db.recipes[db.recipes.length - 1].id[]

    
    db.recipes.push(req.body);
    return res.status(201).send({ status: 201, message: 'A New Recipe added', recipes: db.recipes });
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
