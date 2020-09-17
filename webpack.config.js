const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true // 错误打印出来
  },
  // historyApiFallback: {} // 前端路由页面请求不一定是index.html， 映射进来index.html
  hot: true // 修改组件只渲染当前组件的效果，整个页面不会重新加载
}

const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}

if (isDev) {
  config.mode = 'development'
  config.devServer = devServer
  config.module.rules.push({
    test: /\.(sa|sc|c)ss$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'sass-loader'
    ]
  })
  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ])
} else {
  config.mode = 'production'
  config.output.filename = '[name].[chunkhash:8].js'
  config.optimization = {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  }
  config.module.rules.push({
    test: /\.(sa|sc|c)ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'sass-loader'
    ]
  })
  config.plugins = config.plugins.concat([
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    })
  ])
}
module.exports = config