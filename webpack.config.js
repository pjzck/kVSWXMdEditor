"use strict";

const path = require("path");

const config = {
    target: "node",
    entry: "./plugin.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "extension.js",
        libraryTarget: "commonjs2",
        devtoolModuleFilenameTemplate: "../[resource-path]"
    },
    devtool: "source-map",
    externals : {
        vscode: "commonjs vscode"
    },
    resolve: {
        // 支持读取TypeScript和JavaScript文件, 📖 -> https://github.com/TypeStrong/ts-loader
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            }
        ]
    }
}

module.exports = config;