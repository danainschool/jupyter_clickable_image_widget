const path = require('path');
const version = require('./package.json').version;

// Custom webpack rules are generally the same for all webpack bundles, hence
// stored in a separate local variable.
const rules = [
    { test: /\.css$/, use: ['style-loader', 'css-loader']}
]


module.exports = (env, argv) => {
    const devtool = argv.mode === 'development' ? 'source-map' : false;
    return [
        {// Notebook extension
        //
        // This bundle only contains the part of the JavaScript that is run on
        // load of the notebook. This section generally only performs
        // some configuration for requirejs, and provides the legacy
        // "load_ipython_extension" function which is required for any notebook
        // extension.
            entry: './lib/extension.js',
            output: {
                filename: 'extension.js',
                path: path.resolve(__dirname, '..', 'jupyter_clickable_image_widget', 'nbextension'),
                libraryTarget: 'amd',
            },
            devtool
        },
        {// Bundle for the notebook containing the custom widget views and models
        //
        // This bundle contains the implementation for the custom widget views and
        // custom widget.
        // It must be an amd module
        //
            entry: ['./amd-public-path.js', './lib/index.js'],
            output: {
                filename: 'index.js',
                path: path.resolve(__dirname, '..', 'jupyter_clickable_image_widget', 'nbextension'),
                libraryTarget: 'amd',
                publicPath: '', // Set in amd-public-path.js
            },
            devtool,
            module: {
                rules: rules
            },
            // 'module' is the magic requirejs dependency used to set the publicPath
            externals: ['@jupyter-widgets/base', 'module']
        },
        {// Embeddable jupyter_clickable_image_widget bundle
        //
        // This bundle is generally almost identical to the notebook bundle
        // containing the custom widget views and models.
        //
        // The only difference is in the configuration of the webpack public path
        // for the static assets.
        //
        // It will be automatically distributed by unpkg to work with the static
        // widget embedder.
        //
        // The target bundle is always `dist/index.js`, which is the path required
        // by the custom widget embedder.
        //
            entry: ['./amd-public-path.js', './lib/index.js'],
            output: {
                filename: 'index.js',
                path: path.resolve(__dirname, 'dist'),
                libraryTarget: 'amd',
                publicPath: '', // Set in amd-public-path.js
            },
            devtool,
            module: {
                rules: rules
            },
            // 'module' is the magic requirejs dependency used to set the publicPath
            externals: ['@jupyter-widgets/base', 'module']
        }
    ];
}