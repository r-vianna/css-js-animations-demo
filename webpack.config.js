const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'public'),
    entry: path.resolve(__dirname, 'public/src/app.js'),
    resolve: {
        root: path.resolve(__dirname, 'public/src/')
    },
    output: {
        path: path.join(__dirname, 'public/build/'),
        publicPath: '/build/',
        filename: 'app.bundle.js'
    },
    devServer: {
        contentBase: 'public'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: [
                    path.join(__dirname, 'public/src')
                ],
                exclude: /\.html?$/,
                query: {
                    presets: 'es2015'
                }
            }
        ]
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
    watch: true
};