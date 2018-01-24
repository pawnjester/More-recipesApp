import express from 'express';
import path from 'path';
import logger from 'morgan';
import dotenv from 'dotenv';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import recipes from './routes/index';
import user from './routes/user';
import database from './models';
import webpackConfig from '../webpack.config.dev';

dotenv.config();

const app = express();
// swagger definition
const swaggerDefinition = {
  info: {
    title: 'More Recipe API',
    version: '1.0.0',
    description: 'More Recipes API documention with swagger',
  },
  host: 'localhost:3000',
  basePath: '/',
};

const publicPath = express.static(path.join(__dirname, '../build/'));

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/doc.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use(express.static(path.join(__dirname, '../client/public/assets')));
app.use(express.static('./server/swagger'));
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackHotMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  }));
  app.use(webpackMiddleware(compiler));
}

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/recipes', recipes);
app.use('/api/v1/users', user);

app.use('/', express.static('build/js'));
app.use('*', express.static('build/js'));

app.use((req, res, next) => {
  const err = res.status(404).send({
    ERROR: '404: Sorry Page Not Found!',
  });
  next(err);
});

database.sequelize.authenticate()
  .then(() => app.listen(port, () => {
    console.log(`Application has started on  ${port}`);
  }))
  .catch(error => console.log(error));

export default app;
