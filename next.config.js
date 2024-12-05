/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mangadex.org",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // Currently having a lot of errors, just ignore them for now //
  // [kamii0909]: ping me if you upgrade eslint to 9 (btw only next 15 is
  // compatible with eslint 9), I will write the flat config instead.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
