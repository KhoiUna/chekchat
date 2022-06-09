module.exports = {
  origin:
    process.env.NODE_ENV === "production"
      ? [
          "https://chek-nine.vercel.app",
          "https://chekchat.khoiuna.info",
          "https://chekchat.cc",
        ]
      : ["http://localhost:3000"],

  surveyOrigin:
    process.env.NODE_ENV === "production"
      ? ["https://survey.chekchat.cc"]
      : ["http://127.0.0.1:5500"],

  //config cookie options
  cookieSecurity: process.env.NODE_ENV === "production",
  cookieSameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};
