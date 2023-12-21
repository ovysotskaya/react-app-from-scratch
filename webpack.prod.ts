import * as webpack from "webpack";

const config: webpack.Configuration = {
    mode: 'production',
    devtool: 'source-map',
    devServer: {
        port: process.env.PORT
    },
};

module.exports = config;
