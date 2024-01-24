require('dotenv').config();
const passport = require("passport");
const session = require("express-session");

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user.m');

// Local strategy
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.getUserByLogin(username, password);
            if (!user) {
                return done(null, false, { message: 'Invalid username or password' });
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
            let userEmail = profile.emails[0].value;
            userEmail = userEmail.split('@')[0];

            let user = await User.getUserByLogin(userEmail, profile.id);
            if (!user) {
                //add new user

                let userInfo = {
                    username: userEmail,
                    password: profile.id,
                    email: profile.emails[0].value,
                    fullname: profile.displayName,
                    avatar: profile.photos[0].value,
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


module.exports = (app) => {
    const sessionSecret = process.env.SESSION_SECRET || "InfinityTeam";
    app.use(session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            secure: true
        }
    }));


    app.use(passport.initialize());
    app.use(passport.session());
}
