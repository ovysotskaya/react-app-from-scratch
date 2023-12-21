import { merge } from "webpack-merge";

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const Dotenv = require('dotenv');

import * as webpack from 'webpack';

const config: webpack.Configuration = {
    entry: {
        main: path.resolve(__dirname, './src/index.ts'),
    },
    output: {
        filename: '[name].bundle.ts',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'template.html'),
            filename: 'index.html',
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist'],
                },
            },
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env)
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx','.tsx', '.ts'],
    },
    devServer: {
        static: './dist',
    },
};

module.exports = () => {
    if (process.env.NODE_ENV === 'production') {
        return merge(config, require('./webpack.prod.ts'));
    }
    Dotenv.config({ path: './.env' });
    return merge(config, require('./webpack.dev.ts'));
};
