import { merge } from 'webpack-merge';

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv';

import webpack from 'webpack';

const config: webpack.Configuration = {
    entry: {
        main: path.resolve(__dirname, './src/index.ts'),
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/template.html'),
            filename: 'index.html',
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
