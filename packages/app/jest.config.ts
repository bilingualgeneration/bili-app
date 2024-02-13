import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  globals: {
    // global variables configuration
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  // other Jest configuration options
};

export default config;
