import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

globalIgnores([
  ".next/*",
  "out/*",
  ".switchboard/*",
  "legacy_vanilla/*",
  "src/_deprecated/*",
  "node_modules/*"
]);

export default defineConfig([
  nextVitals,
  nextTs,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-console": ["warn", { "allow": ["warn", "error"] }]
    }
  }
]);
