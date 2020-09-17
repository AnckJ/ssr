const { merge } = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '../index.html')
  }),
  new VueClientPlugin(),
  new CopyWebpackPlugin({
    patterns: [{
      from: path.resolve(__dirname, '../src/assets/js'),
      to: '../dist/resources/src/assets/js'
    }]
  })
]

const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true // 错误打印出来
  },
  headers: { 'Access-Control-Allow-Origin': '*' },
  // historyApiFallback: {
    // index: 'index.html'
  // }, // 前端路由hostory模式时，路由路径需要映射到对应的页面
  hot: true, // 修改组件只渲染当前组件的效果，整个页面不会重新加载
}

let config
if (isDev) {
  config = merge(baseConfig, {
    mode: 'development',
    entry: './src/client-entry.js',
    devServer,
    module: {
      rules: [{
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
      }]
    },
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    mode: 'production',
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/dist/'
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    module: {
      rules: [{
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
      }]
    },
    plugins: defaultPlugins.concat([
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css'
      })
    ])
  })
}

module.exports = config
