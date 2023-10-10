/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    basePath: '/training',
    assetPrefix: '/training/'
}

// const nextConfig = {
//     basePath: '/training',
//     assetPrefix: '/training/'
// }

module.exports = nextConfig
