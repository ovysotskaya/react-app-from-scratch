import * as webpack from "webpack";

const config: webpack.Configuration = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: process.env.DEV_PORT
    },
};

module.exports = config;
