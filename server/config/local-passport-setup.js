const passport = require("passport");
const LocalStrategy = require("passport-local");
const UsersUtil = require("../utils/UsersUtil");

// Configure the local strategy for use by Passport
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const userObj = await UsersUtil.loginUser(email, password);
        if (!userObj) {
          return done(null, false);
        }

        return done(null, {
          id: userObj.id,
          username: userObj.username,
          email: userObj.email,
          avatarURL: userObj.avatarURL,
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);
