module.exports = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://chekchat.vercel.app"
      : "http://localhost:3000",
};
