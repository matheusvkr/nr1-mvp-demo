/** @type {import('next').NextConfig} */
const nextConfig = {

  output: 'export',
  basePath: '/nr1-mvp-demo',
  //assetPrefix: '/nr1-mvp-demo/',

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig