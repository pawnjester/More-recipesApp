import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 8000;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Application has started on  ${port}`)
});


global.recipes = [
  {
    id: 1,
    name: 'Egusi',
    ingredients: 'Leaf and tomatoes',
    preparation: 'Stir and wait till it turns brown'
  }
];


app.get('/api', function(req, res) {
  return res.send({message: "This is a wrong route" })
});


app.get('/api/recipes', function(req, res) {
  return res.send({message: "Welcome to More-Recipes Application, these are the recipes available", recipes:global.recipes })
});

app.post('/api/recipes', function(req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const ingredients = req.body.ingredients;
  const method = req.body.method;

  if(!id) {
    return res.status(400).send({statusCode:400, message: "Put in an id"});
  }
  if(!name) {
    return res.status(400).send({statusCode:400, message: "Put in the name of the recipe"});
  }
  if(!ingredients) {
    return res.status(400).send({statusCode:400, message: "Put in the ingredients"});
  }
  if(!method) {
    return res.status(400).send({statusCode:400, message: "Method missing"});
  }
  global.recipes.push(req.body);
  return res.status(201).send({status: 201, message: "A New Recipe added", recipes:global.recipes});
});

app.put('/api/recipes/:recipeId', function(req, res) {
  for(let i= 0; i < global.recipes.length; i++) {
    if(global.recipes[1].id === parseInt(req.params.recipeId, 10)) {
      global.recipes[1].name = req.body.name;
      global.recipes[1].ingredients = req.body.ingredients;
      global.recipes[1].method = req.body.method;      
      return res.status(200).send({message: "Recipe has been modified"})
    }
  }
  return res.status(404).send({message: "User not found"})
})

app.delete('/api/recipes/:recipeId', function(req, res) {
  for(let i= 0; i < global.recipes.length; i++) {
    if(global.recipes[1].id === parseInt(req.params.recipeId, 10)) {
      global.recipes.splice(1,1)    
      return res.status(200).send({message: "Recipe has been removed"})
    }
  }
  return res.status(404).send({message: "User not found"})
})



export default app;
