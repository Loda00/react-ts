const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    resolve: {
        extensions: ['.js','.jsx','.ts','.tsx']
    },
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: './app/index.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: './js/[name].bundle.js'
    },
    cache: true,
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader']
            },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: 'babel-loader'
            // }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        compress: true,
        port: 3001,
        open: true,
        contentBase: path.resolve(__dirname, 'public')
    },
    plugins: [
        new cleanWebpackPlugin(['dist']),
        // new MiniCssExtractPlugin({
        //     filename: path.resolve(__dirname, 'public/style.css')
        // })
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        })
    ]
}