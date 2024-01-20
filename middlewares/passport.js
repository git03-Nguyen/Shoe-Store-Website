const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.m');
const Permission = require('../models/permission.m');

require('dotenv').config();

// Local strategy
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
        const user = await User.getUserByLogin(username, password);
        if (!user) {
            return done(null, false, {message: 'Invalid username or password'});
        }

        return done(null, user);
        } catch (error) {
        return done(error);
        }
    }
));

// Google strategy
passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.getUserByUsername(profile.displayName);
            if(!user) {
                //add new user

                let userInfo = {
                    username: profile.displayName,
                    password: profile.id,
                    email: profile.emails[0].value,
                    fullName: profile.name.familyName + " " + profile.name.givenName,
                    avatar: profile.photos[0].value,
                    permission: Permission.GOOGLE,
                }

                user = await User.addNewUser(userInfo);
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.getUserByID(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
