/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // assetPrefix: 'http://vilaweb.link/training',
  basePath: '/training',
  assetPrefix: '/training/'
}

module.exports = nextConfig
