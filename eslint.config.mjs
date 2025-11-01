import nextConfig from "eslint-config-next/core-web-vitals";

const config = [
    {
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
    },
    ...nextConfig,
];

export default config;

