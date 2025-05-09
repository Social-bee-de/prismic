/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/en-us',
  //       permanent: false, // Set to true if this is a permanent redirect (301)
  //     },
  //   ];
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;