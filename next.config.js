/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

module.exports = nextConfig
