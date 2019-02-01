const webpack = require("webpack");
const path = require("path");
const createVariants = require("parallel-webpack").createVariants;
const CleanWebpackPlugin = require("clean-webpack-plugin");

const PATHS = {
  src: path.resolve(__dirname, "src"),
  dist: path.resolve(__dirname, "dist")
};

const { NODE_ENV = "development" } = process.env;

const createConfig = ({ libraryTarget }) => {
  return {
    mode: NODE_ENV,

    output: {
      path: PATHS.dist,
      filename: "IDXApi." + libraryTarget + ".js",
      pathinfo: false,
      globalObject: "this",
      library: "IDXApi",
      libraryTarget
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          include: PATHS.src,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      modules: false,
                      targets: {
                        browsers: [
                          "last 2 versions",
                          "safari >= 7",
                          "ie > 10",
                          "not op_mini all"
                        ]
                      }
                    }
                  ]
                ],
                plugins: ["@babel/plugin-proposal-object-rest-spread"]
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(NODE_ENV)
        }
      }),

      new CleanWebpackPlugin(PATHS.dist)
    ],

    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false
    }
  };
};

module.exports = createVariants(
  {
    libraryTarget: ["commonjs2", "umd"]
  },
  createConfig
);
