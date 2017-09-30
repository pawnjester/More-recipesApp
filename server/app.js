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

process.env.SECRET_KEY = 'jyurhitjkwowjwnbhjtotjhfhkjdshjdsgyhbjds';

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to More-Recipes' });
});

app.use((req, res, next) => {
  const err = res.status(404).send({
    ERROR: '404: Sorry Page Not Found!'
  });
  next(err);
});

app.listen(port, () => {
  console.log(`Application has started on  ${port}`);
});

export default app;
