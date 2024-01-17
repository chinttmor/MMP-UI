/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/admin/",
        destination: "/auth/sign-in",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
