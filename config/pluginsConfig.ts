import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";

export function pluginsConfig () {
    return [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/template.html'),
            filename: 'index.html',
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env)
        }),
    ]
}
