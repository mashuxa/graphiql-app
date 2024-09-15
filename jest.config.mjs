const presets = [
  "@babel/preset-typescript",
  "@babel/preset-env",
  ["@babel/preset-react", { runtime: "automatic" }],
];

const config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/app/layout.tsx",
    "!src/firebase.ts",
    "!src/config.ts",
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      statements: 80,
    },
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testEnvironment: "jsdom",
  transform: { "^.+\\.(ts|tsx)$": ["babel-jest", { presets }] },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^.+\\.(css|scss|sass)$": "identity-obj-proxy",
  },
};

export default config;
