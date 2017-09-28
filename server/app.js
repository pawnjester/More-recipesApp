import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import recipes from './routes/index';

const app = express();
const port = process.env.PORT || 8000;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/recipes', recipes);

app.get('/', (req,res) => {
  res.status(200).send({message: 'Welcome to More-Recipes'});
});

app.listen(port, () => {
  console.log(`Application has started on  ${port}`)
});

export default app;
