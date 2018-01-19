const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractWebPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const buildPath = path.join(__dirname, 'build');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    path.join(__dirname, './client/src/Index.jsx')
  ],
  output: {
    path: path.join(__dirname, './build/js'),
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
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        comparisons: true,
        conditionals: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        sequences: true,
        unused: true,
        warnings: false,
      },
      output: {
        comments: false,
        beautify: false,
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client/public/index.html'),
      path: buildPath,
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};
