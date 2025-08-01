import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      include: ["src/**/*"],
      exclude: [
        "node_modules/",
        "dist/",
        "coverage/",
        "**/*.test.ts",
        "**/*.config.ts",
        "test/**/*",
      ],
    },
  },
});
