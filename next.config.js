/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "play-lh.googleusercontent.com",
      "upload.wikimedia.org",
      "res.cloudinary.com",
      "cdn.pixabay.com",
      "img.freepik.com",
      "thumbs.dreamstime.com",
      "www.suteba.org.ar",
      "www.laboratoriodescole.com",
      "is5-ssl.mzstatic.com",
      "www.pasteleros-salta.org.ar",
      "cdn.bitrix24.es",
      "pbs.twimg.com",
      "www.apressalud.com.ar",
      "www.lu24.com.ar",
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve("crypto-js"),
      };
    }

    return config;
  },
};

