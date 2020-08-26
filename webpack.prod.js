const HtmlWebPackPlugin       = require('html-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin            = require("babel-minify-webpack-plugin");
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

  mode: 'production',
  optimization: {// solo se plica en modo production
    minimizer: [new OptimizeCssAssetsPlugin()]
  },
  output:{
    filename: 'main.[contentHash].js'
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: [
          "babel-loader" 
        ] 
      },
      {
        test: /\.css$/,
        exclude: /styles\.css$/,// no aplicar los estilos a este archivo styles
        use: [
          'style-loader',// esto agrega los estilos al mismo archivo bundle, en este caso a main.js todo en 1
          'css-loader'
        ]
      },
      {// estoy independicando los estilos en el archivo styles
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
          minimize: true,// si esta true minimiza el archivo index.html
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
      filename: '[name].[contentHash].css',// [name], crea el nombre como main.css
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [
        {from: 'src/assets', to: 'assets/'}
      ]
    }),
    new MinifyPlugin(),
    new CleanWebpackPlugin()
  ]

}