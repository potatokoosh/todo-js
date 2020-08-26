const HtmlWebPackPlugin       = require('html-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

  mode: 'development',
  optimization: {// solo se plica en modo production
    minimizer: [new OptimizeCssAssetsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /styles\.css$/,// no aplicar los estilos a este archivo styles
        use: [
          'style-loader',// esto agrega los estilos al mismo archivo bundle, en este caso a main.js todo en 1
          'css-loader'
        ]
      },
      {
        test: /styles\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: false,
          minimize: false,// si esta true minimiza el archivo index.html
        }, 
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false
            }
          }
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',// [name], crea el nombre como main.css
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [
        {from: 'src/assets', to: 'assets/'}
      ]
    }),
    new CleanWebpackPlugin()
  ]

}