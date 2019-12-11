module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/__mocks__/", "__helpers__"],
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
