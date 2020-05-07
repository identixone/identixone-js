module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ["eslint:recommended", "prettier", "plugin:jest/recommended"],
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
    },
  },
  plugins: ["prettier", "jest"],
};
