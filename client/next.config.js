module.exports = {
  poweredByHeader: false,
  images: {
    domains: ["ik.imagekit.io"],
  },
  env: {
    ORIGIN:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5000"
        : "https://chekapp.herokuapp.com",
  },
};
