/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  build: {
    extend(config, {}) {
      config.node = {
        fs: "empty",
      };
    },
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  async redirects() {
    return [
      {
        source: "/postJob",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
