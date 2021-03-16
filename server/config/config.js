module.exports = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://chek-three.vercel.app"
      : "http://localhost:3000",
};
