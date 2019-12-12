module.exports = {
  testPathIgnorePatterns: ["/__mocks__/", "/__helpers__/", "/node_modules/"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(js)$": "babel-jest",
    "^.+\\.(ts)$": "ts-jest",
  },
};
