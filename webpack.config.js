const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "IT-Library",
      }),
      new MiniCssExtractPlugin({ filename: "[name].css" }),
    ],
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
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: env.PORT || 3000,
      historyApiFallback: true,
    },
  };
};
