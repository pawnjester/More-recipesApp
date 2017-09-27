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
  const name = req.body.name;
  const ingredients = req.body.ingredients;
  const method = req.body.method;

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
})



export default app;
