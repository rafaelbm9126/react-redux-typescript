const path = require("path");

module.exports = {
  webpack: function (config, env) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "assets": path.resolve(__dirname, "src/assets/"),
      "components": path.resolve(__dirname, "src/components/"),
      "helpers": path.resolve(__dirname, "src/helpers/"),
      "pages": path.resolve(__dirname, "src/pages/"),
    };
    return config;
  },
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      proxy = {
        '/api': {
          target: 'http://192.81.211.252',
          pathRewrite: { '^/api': '/' }
        },
      }
      const config = configFunction(proxy, allowedHost);
      return config;
    };
  },
}
