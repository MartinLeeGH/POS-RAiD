//from docs
const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  // testEnvironment: "jest-environment-jsdom",
  testEnvironment: "node"//prisma client has to run in a node environment for jest testing
};
module.exports = createJestConfig(customJestConfig);