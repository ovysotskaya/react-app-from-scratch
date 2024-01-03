import "webpack-dev-server";
import path from 'path';
import webpack from 'webpack';
import Dotenv from 'dotenv';

import { pluginsConfig } from "./config/pluginsConfig";

Dotenv.config({ path: './.env' });

type BuildType = {
    mode: 'development' | 'production' | 'none'
};

export default (config: BuildType): webpack.Configuration => {
   return {
       mode: config.mode || 'development',
       entry: {
           main: path.resolve(__dirname, './src/index.ts'),
       },
       output: {
           filename: '[name].[contenthash].js',
           path: path.resolve(__dirname, './dist'),
           clean: true
       },
       plugins: pluginsConfig(),
       module: {
           rules: [
               {
                   test: /\.tsx?$/,
                   use: 'ts-loader',
                   exclude: /node_modules/,
               },
           ],
       },
       resolve: {
           extensions: ['.js', '.jsx','.tsx', '.ts'],
       },
       devServer: config.mode === 'development' ? {
           port: process.env.DEV_PORT,
           open: true
       } : undefined
   }
};
