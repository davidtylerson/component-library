/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@float-vibe-foundry/design-system'],
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
