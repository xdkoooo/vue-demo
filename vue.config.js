module.exports = {
    devServer: {
        hot: true,
        open: true
    },
    configureWebpack: {
        resolve: {
            symlinks: true,
        }
    },
    css: {
        loaderOptions: {
            sass: {
            }
        }
    },
}