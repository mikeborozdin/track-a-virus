const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  return {
    entry: ['@hot-loader/react-dom', './src/index.tsx'],
    output: {
      filename: '[name].[hash].js',
      path: __dirname + '/dist',
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: env === 'production' ? false : 'source-map',
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['.ts', '.tsx', '.js', '.css'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        // { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
        { test: /\.tsx?$/, loader: 'ts-loader' },

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },

        {
          test: /\.css$/i,
          use: [
            'style-loader',
            '@teamsupercell/typings-for-css-modules-loader',
            {
              loader: 'css-loader',
              options: { modules: { localIdentName: '[local]-[hash]' } },
            }
          ]
        },

        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader',
          ],
        },
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebPackPlugin({ template: './src/index.html', favicon: "./src/favicon.ico" }),
      new Dotenv(
        {
          path: env === 'production' ? './.env' : './.env.development'
        }
      )
    ],
    devServer: {
      contentBase: './dist',
      hot: true,
    },
  };
};
