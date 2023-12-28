// Require necessary plugins for Webpack configuration
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Webpack configuration exported as a function
module.exports = () => {
  return {
    // Set the mode to development
    mode: "development",
    // Define entry points for the application
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    // Define the output configuration for bundled files
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    // Configure plugins for Webpack
    plugins: [
      // Generate HTML files based on templates
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE",
      }),

      // Inject the service worker manifest into the application
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),

      // Generate a Web App Manifest for the PWA
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "JATE",
        description: "JATE - The Text Editor!",
        background_color: "#132e4f",
        theme_color: "#132e4f",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],
    // Configure modules and loaders for CSS and JavaScript
    module: {
      // Define rules for CSS files
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // Use babel-loader to transpile ES6 code
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
