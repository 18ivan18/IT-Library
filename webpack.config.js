const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  const isProd = env.NODE_ENV === "prod";
  const mode = isProd ? "production" : "development";
  return {
    mode: "development",
    devtool: "source-map",
    entry: "./src/index.js",
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }]],
              plugins: ["@babel/plugin-proposal-class-properties"],
            },
          },
        },
        {
          test: /\.ico$/,
          loader: "file-loader",
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "IT-Library",
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: env.PORT || 3000,
      historyApiFallback: true,
    },
  };
};
