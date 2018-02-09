const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/public/index.html',
  filename: 'index.html',
  inject: 'body',
  minify: {
    collapseWhitespace: true,
    collapseInlineTageWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true
  }
});


module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client', path.join(__dirname, './client/src/Index.jsx')
  ],
  output: {
    path: path.join(__dirname, 'build/js'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [

      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'client'),
        exclude: /node_modules\//,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        loader: [
          'style-loader',
          'css-loader',
          'font-loader?format[]=truetype&format[]=woff&format[]=embedded-opentype',
        ]
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=/fonts/[name].[ext]',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]', {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '75-90',
                speed: 3,
              },
            },
          }],
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: path.resolve('./.env'),
      safe: false,
      systemvars: true,
    }),
    HtmlWebpackPluginConfig
  ]
};
