module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
    },
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy"
    }
  };
  