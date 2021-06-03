module.exports = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://chek-nine.vercel.app"
      : "http://localhost:3000",

  //config cookie options
  cookieSecurity: process.env.NODE_ENV === "production",
  cookieSameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};
