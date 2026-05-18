/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',

  trailingSlash: true,

  basePath: isProd ? '/nr1-mvp-demo' : '',
  assetPrefix: isProd ? '/nr1-mvp-demo/' : '',

  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig