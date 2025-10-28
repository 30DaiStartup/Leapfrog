/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Transpile Three.js packages
  transpilePackages: ['three'],

  // Empty turbopack config to silence warning (Next.js 16+)
  turbopack: {},
}

module.exports = nextConfig
