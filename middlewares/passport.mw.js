require('dotenv').config();
const passport = require("passport");
const session = require("express-session");

module.exports = (app) => {
  const sessionSecret = process.env.SESSION_SECRET || "InfinityTeam";
  app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
    }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    // implement here
  });

  passport.deserializeUser(async (id, done) => {
    // implement here
  });
}
