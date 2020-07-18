module.exports = {
  devServer: {
    port: 8088,
    proxy: {
      '^/': {
        target: 'https://public-api.tracker.gg',
        ws: true,
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
        pathRewrite: {"^/": "/v2/bfv/standard/profile/origin/"}
      }
    }
  },
  publicPath: '/',
  outputDir: 'docs'
};