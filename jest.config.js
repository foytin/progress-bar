module.exports = {
  collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.d.ts",
      "!src/app.*",
  ],
  coveragePathIgnorePatterns: [
      "/node_modules/",
  ],
  setupFiles: [
      "react-app-polyfill/jsdom"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/config/setupTests.tsx",
  ],
  testRegex: "(/tests/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  transform: {
      "^.+\\.tsx?$": "ts-jest"
  },
  transformIgnorePatterns: [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
      "^.+\\.module\\.(css|sass|scss)$"
  ],
  modulePaths: [],
  moduleNameMapper: {
      "\\.(css|sass|scss)$": "identity-obj-proxy"
  },
  moduleFileExtensions: [
      "js",
      "ts",
      "tsx",
      "jsx",
  ],
  globals: {
      "ts-jest": {
          "extends": "./tsconfig.json",
          "compilerOptions": {
              "jsx": "react"
          }
      }
  },
}