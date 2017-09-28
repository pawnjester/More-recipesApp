import db from '../models/db';

// global.recipes = [
//   {
//     id: 1,
//     name: 'Egusi',
//     ingredients: 'Leaf and tomatoes',
//     method: 'Stir and wait till it turns brown'
//   }
// ];

class Recipes {
  addRecipe(req, res) {
    const id = req.body.id;
    const numberid = parseInt(id);
    const name = req.body.name;
    const ingredients = req.body.ingredients;
    const method = req.body.method;
    const upVotes = req.body.upVotes

    if (!numberid) {
      return res.status(400).send({ statusCode: 400, message: "Put in an id" });
    }
    if (!name) {
      return res.status(400).send({ statusCode: 400, message: "Put in the name of the recipe" });
    }
    if (!ingredients) {
      return res.status(400).send({ statusCode: 400, message: "Put in the ingredients" });
    }
    if (!method) {
      return res.status(400).send({ statusCode: 400, message: "Method missing" });
    }
    if (!upVotes) {
      return res.status(400).send({ statusCode: 400, message: "Please vote" });
    }
    db.recipes.push(req.body);
    return res.status(201).send({ status: 201, message: "A New Recipe added", recipes: db.recipes });
  }


  modifyRecipe(req, res) {
    for (let i = 0; i < db.recipes.length; i++) {
      if (parseInt(db.recipes[i].id, 10) === parseInt(req.params.recipeid, 10)) {
        db.recipes[i].name = req.body.name;
        db.recipes[i].ingredients = req.body.ingredients;
        db.recipes[i].method = req.body.method;
        return res.status(200).send({ message: "Recipe has been modified" })
      }
    }
    return res.status(404).send({ message: "Recipe not found" });
  }

  deleteRecipe(req,res) {
    for (let i = 0; i < db.recipes.length; i++) {
    if (parseInt(db.recipes[i].id, 10) === parseInt(req.params.recipeId, 10)) {
      db.recipes.splice(i, 1)
      return res.status(200).send({ message: "Recipe has been removed" })
    }
  }
  return res.status(404).send({ message: "Recipe not found" })
}

getRecipesbyId(req,res) {
  for (let i = 0; i < db.recipes.length; i++) {
    if (parseInt(db.recipes[i].id, 10) === parseInt(req.params.recipeId, 10)) {
      // global.recipes.splice(1,1)    
      return res.status(200).send({ message: "Recipe has been found", recipes: db.recipes[i] })
    }
  }
  return res.status(404).send({ message: "Recipe not found" })

}

getRecipe(req,res){
  return res.send({ message: "Welcome to More-Recipes Application, these are the recipes available", recipes: db.recipes })
}
}


// app.get('/api', function (req, res) {
//   return res.send({ message: "This is a wrong route" })
// });


// app.get('/api/recipes', function (req, res) {
//   return res.send({ message: "Welcome to More-Recipes Application, these are the recipes available", recipes: global.recipes })
// });

// router.post('/api/recipes', function (req, res) {
//   const id = req.body.id;
//   const numberid = parseInt(id);
//   const name = req.body.name;
//   const ingredients = req.body.ingredients;
//   const method = req.body.method;

//   if (!numberid) {
//     return res.status(400).send({ statusCode: 400, message: "Put in an id" });
//   }
//   if (!name) {
//     return res.status(400).send({ statusCode: 400, message: "Put in the name of the recipe" });
//   }
//   if (!ingredients) {
//     return res.status(400).send({ statusCode: 400, message: "Put in the ingredients" });
//   }
//   if (!method) {
//     return res.status(400).send({ statusCode: 400, message: "Method missing" });
//   }
//   global.recipes.push(req.body);
//   return res.status(201).send({ status: 201, message: "A New Recipe added", recipes: global.recipes });
// });

// app.put('/api/recipes/:recipeid', function (req, res) {
//   for (let i = 0; i < global.recipes.length; i++) {
//     if (parseInt(global.recipes[i].id, 10) === parseInt(req.params.recipeid, 10)) {
//       global.recipes[i].name = req.body.name;
//       global.recipes[i].ingredients = req.body.ingredients;
//       global.recipes[i].method = req.body.method;
//       return res.status(200).send({ message: "Recipe has been modified" })
//     }
//   }
//   return res.status(404).send({ message: "Recipe not found" });
// })

// app.delete('/api/recipes/:recipeId', function (req, res) {
//   for (let i = 0; i < global.recipes.length; i++) {
//     if (parseInt(global.recipes[i].id, 10) === parseInt(req.params.recipeId, 10)) {
//       global.recipes.splice(i, 1)
//       return res.status(200).send({ message: "Recipe has been removed" })
//     }
//   }
//   return res.status(404).send({ message: "Recipe not found" })
// });

// app.get('/api/recipes/:recipeId', function (req, res) {
//   for (let i = 0; i < global.recipes.length; i++) {
//     if (parseInt(global.recipes[i].id, 10) === parseInt(req.params.recipeId, 10)) {
//       // global.recipes.splice(1,1)    
//       return res.status(200).send({ message: "Recipe has been found", recipes: global.recipes[i] })
//     }
//   }
//   return res.status(404).send({ message: "Recipe not found" })
// });

// app.post('/api/recipes/:recipeId/reviews', function (req, res) {
//   for (let i = 0; i < global.recipes.length; i++) {
//     if (parseInt(global.recipes[i].id, 10) === parseInt(req.params.recipeId, 10)) {
//       global.recipes[i].review = req.body.review;
//       // global.recipes[i].push(req.body);
//       return res.status(200).send({ message: "Review has been added" });
//     }
//   }
//   return res.status(200).send({ message: "Recipe not found" })
// });

export default Recipes;
