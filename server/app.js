import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import recipes from './routes/index';
import user from './routes/user';
import dotenv from 'dotenv';
import database from './models';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';
dotenv.config();

const app = express();
const compiler = webpack(webpackConfig);
const port = process.env.PORT || 8000;

app.use(webpackHotMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/recipes', recipes);
app.use('/api/v1/users', user)
app.use(webpackMiddleware(compiler));


app.get('/*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.use((req, res, next) => {
  const err = res.status(404).send({
    ERROR: '404: Sorry Page Not Found!'
  });
  next(err);
});

database.sequelize.authenticate()
  .then(() => app.listen(port, () => {
    console.log(`Application has started on  ${port}`);
  }))
  .catch(error => console.log(error));

export default app;
