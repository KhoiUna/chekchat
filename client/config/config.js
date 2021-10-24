module.exports = {
  origin: process.env.NEXT_PUBLIC_ORIGIN || "https://api.chekchat.xyz",
  // "https://chekapp.herokuapp.com",
  launched: false,
  cookieOptions: {
    path: "/",
    expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days
    maxAge: 24 * 60 * 60, // 1 day
    secure: true,
    sameSite: "strict",
  },
};
