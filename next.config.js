/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // trailingSlash: true,
  webpack(config) {
    //* In case a weird 'fs' bug shows up again
    // config.resolve = {
    //   ...config.resolve,
    //   fallback: {
    //     fs: false,
    //     path: false,
    //     os: false,
    //   },
    // };
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
