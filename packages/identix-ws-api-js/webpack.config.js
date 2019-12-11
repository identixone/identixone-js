const webpack = require("webpack");
const path = require("path");
const createVariants = require("parallel-webpack").createVariants;

const PATHS = {
  src: path.resolve(__dirname, "src"),
  dist: path.resolve(__dirname, "dist"),
};

const { NODE_ENV = "development" } = process.env;

const createConfig = ({ target }) => {
  return {
    mode: NODE_ENV,

    output: {
      path: PATHS.dist,
      filename: "IDXApi." + target + ".js",
      pathinfo: false,
      globalObject: "this",
      library: "IDXApi",
      libraryTarget: "umd",
    },

    target,

    resolve: {
      extensions: [".ts", ".js"],
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          include: PATHS.src,
        },
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
                          "not op_mini all",
                        ],
                      },
                    },
                  ],
                ],
                plugins: [
                  "@babel/plugin-proposal-object-rest-spread",
                  "@babel/plugin-proposal-class-properties",
                ],
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(NODE_ENV),
        },
      }),
    ],

    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    },
  };
};

module.exports = createVariants(
  {
    target: ["web", "node"],
  },
  createConfig
);
