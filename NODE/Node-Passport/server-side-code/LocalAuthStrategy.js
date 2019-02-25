const User = require("../models/User");
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, (email, password, done) => {
        console.log("Local auth : "+ Date.now());
        let UserModel = User.getUserModel(User.type.LOCAL);
        UserModel.findOne({
            email: email
        }).then(user => {
            if (!user) {
                return done(null, false, {
                    message: 'That email is not registered'
                });
            }
            // Match password
            User.comparePassword(password, user.password, (isMatch) => {
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Password incorrect'
                    });
                }
            });
        });
    }));

}