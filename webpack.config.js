var webpack = require('webpack');
var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Naming and path settings
var appName = 'bundle';
var entryPoint = './src/main.js';
var exportPath = path.resolve(__dirname, './build');

// Environment flag
var plugins = [];
var env = process.env.WEBPACK_ENV;

// Differ settings based on production flag
if (env === 'production') {
    var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

    plugins.push(new UglifyJsPlugin({ minimize: true }));
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }));

    appName = appName + '.min.js';
} else {
    appName = appName + '.js';
}

// Main settings config
module.exports = {
    entry: entryPoint,
    output: {
        path: exportPath,
        filename: appName
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.vue', '.js']
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: '1337',
            server: { baseDir: ['./'] },
            files: ['index.html', 'src/*']
        })
    ]
};