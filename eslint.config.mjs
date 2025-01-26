import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

const config = [{
    ignores: [
        "**/.cache",
        "**/node_modules",
        "**/coverage/",
        "**/.DS_Store",
        "**/npm-debug.log",
        "**/.next/",
        "**/next-seo.config.js",
        ".vscode/launch.json",
        "**/.gitlab-ci.yml",
        "**/.babelrc",
        "src/components/Froala",
    ],
}, ...compat.extends("next/core-web-vitals")];

export default config;