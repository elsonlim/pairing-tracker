module.exports = {
  preset: "@shelf/jest-mongodb",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      diagnostics: false,
    },
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/__tests__/**/*.test.js", "**/__tests__/**/*.test.ts"],
  coveragePathIgnorePatterns: ["src/db.ts"],
  setupFilesAfterEnv: ["./__tests__/setup.js"],
};
