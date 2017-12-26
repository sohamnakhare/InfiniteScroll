module.exports = {
    entry: [
        './demo/index.js'
    ],
    module: {
        loaders: [ 
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: __dirname + '/demo',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './demo',
    }
};