module.exports = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://chek-nine.vercel.app"
      : "http://localhost:3000",
};
