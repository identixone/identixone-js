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
          use: "ts-loader",
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
    },
  };
};

module.exports = createVariants(
  {
    target: ["web", "node"],
  },
  createConfig
);
