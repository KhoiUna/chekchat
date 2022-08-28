module.exports = {
  origin: process.env.APP_URL,

  //config cookie options
  cookieSecurity: process.env.NODE_ENV === "production",
  cookieSameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};
