const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin =  require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js'
    },
    mode: 'development',
    watch: true,
    resolve: {
        extensions: ['.js'],
        alias:{
            '@utils': path.resolve(__dirname,'src/utils')
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test:  /\.s?css$/,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            }      
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            inject: true,//Inyecta en bundle al template HTML
            template: './public/index.html',//La ubicacion del template.
            filename: './index.html'
        }),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname,'src','assets/images'),
                    to: 'assets/images'
                }
            ]
        }),
        new Dotenv()
    ],
    
}