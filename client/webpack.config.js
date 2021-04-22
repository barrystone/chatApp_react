const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;

//setting for .env
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
  // call dotenv and it will return an Object with a parsed key
  const env = dotenv.config().parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    output: {
      publicPath: 'http://localhost:8080/'
    },

    resolve: {
      extensions: ['.jsx', '.js', '.json']
    },

    devServer: {
      port: 8080
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        //custom setting (for font .ttf load)
        {
          test: /\.(woff2?|eot|ttf|otf)$/,
          use: {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]?[hash]'
            }
          }
        }
      ]
    },

    plugins: [
      new ModuleFederationPlugin({
        name: 'chat',
        library: { type: 'var', name: 'chat' },
        filename: 'remoteEntry.js',
        remotes: {},
        exposes: {
          // './Chat': './src/App'
          './Chat': './src/screens/LandingScreen'
          // './Chat': './src/components/Chat'
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react
          },
          'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom']
          }
        }
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html'
      }),
      new webpack.DefinePlugin(envKeys)
    ]
  };
};
