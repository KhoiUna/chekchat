module.exports = {
  origin: process.env.NEXT_PUBLIC_ORIGIN || "https://api.chekchat.xyz",
  // "https://chekapp.herokuapp.com",
  cookieSecurity: process.env.NEXT_PUBLIC_ORIGIN !== "http://localhost:5000",
};
