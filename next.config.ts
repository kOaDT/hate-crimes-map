import type { NextConfig } from 'next';
const packageJson = require('./package.json');

const nextConfig: NextConfig = {
  env: {
    npm_package_version: packageJson.version,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagsapi.com',
      },
    ],
  },
};

export default nextConfig;
