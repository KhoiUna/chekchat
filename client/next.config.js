module.exports = {
  poweredByHeader: false,
  images: {
    loader: "cloudinary",
    domains: ["ik.imagekit.io"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
