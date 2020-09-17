const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  entry: path.join(__dirname, '../src/client-entry.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: 'http://localhost:8000/dist/'
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json', 'jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'def': path.resolve(__dirname, '../src/assets/js/abc.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: createVueLoaderOptions(isDev)
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}
module.exports = config
