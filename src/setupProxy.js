const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/xkcdapi',
    proxy({
      target: 'https://xkcd.com',
      changeOrigin: true,
      pathRewrite: {
        '^/xkcdapi': '',
      },
    }),
  );
};
