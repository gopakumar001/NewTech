const Keys = require("../config/Keys");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/User");

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
            clientID: Keys.google.client_id,
            clientSecret: Keys.google.client_secret,
            callbackURL: "/auth/google/callback"
        },
        function (accessToken, refreshToken, profile, done) {
            console.log("Google auth : " + Date.now());
            var userModel = User.getUserModel(User.type.GOOGLE);
            userModel
                .findOne({
                    googleId: profile.id
                })
                .then(currentUser => {
                    if (currentUser) {
                        done(null, currentUser);
                    } else {
                        var newUser = new userModel({
                                displayName: profile.displayName,
                                googleId: profile.id
                            })
                            .save()
                            .then(newUser => {
                                done(null, newUser);
                            })
                            .catch(err => {
                                console.error(err);
                            });
                    }
                });
        }
    ));
}