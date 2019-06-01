const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const mongoose = require('mongoose');
const User = require('../models/user.model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new googleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //console.log(profile);

        User.findOne({ googleId: profile.id }).then((existingUser) => {
            if (existingUser) {
                console.log(`user is ${existingUser}`);
                done(null, existingUser);
            } else {
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile._json.picture
                }).save().then((newUser) => {
                    console.log(newUser);
                    done(null, newUser);
                });
            }
        });


    })
);