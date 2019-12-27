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
      filename: `./index.${target}.js`,
      globalObject: "this",
      library: "IDXREST",
      libraryTarget: "umd",
      umdNamedDefine: true,
    },

    target,

    resolve: {
      extensions: [".js", ".ts"],
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          include: PATHS.src,
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/typescript",
              [
                "@babel/preset-env",
                {
                  targets:
                    target === "node"
                      ? "maintained node versions"
                      : "last 1 version, > 1%, not dead",
                },
              ],
            ],
            plugins: [
              "@babel/proposal-class-properties",
              "@babel/proposal-object-rest-spread",
            ],
          },
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
  };
};

module.exports = createVariants(
  {
    target: ["web", "node"],
  },
  createConfig
);
