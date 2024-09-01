/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
    ],
  },
  async redirects() {
    return [
        {
            source: '/graphiql-client',
            destination: `/graphiql-client/GRAPHIQL/${encodeURIComponent("https://countries.trevorblades.com_")}`,
            permanent: false,
        },
    ];
},
};

export default nextConfig;
