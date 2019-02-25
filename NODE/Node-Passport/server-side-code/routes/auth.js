const express = require("express");
const passport = require("passport");
const route = express.Router();
const User = require("../../models/User");

//GOOGLE oAUTH
route.get('/google',
    passport.authenticate('google', {
        scope: ['profile']
    }));

route.get('/google/callback',
    passport.authenticate('google'),
    function (req, res) {
        res.redirect('/main');
    });



//LOCAL AUTHENTICATION
route.post('/app/login',
    passport.authenticate('local'),
    function(req, res) {
        res.redirect('/main');
    });

route.post('/app/register', (req, res) => {
    var data = req.body,
        userModel = User.getUserModel(User.type.LOCAL);
    userModel
        .findOne({
            email: data.email
        })
        .then(currentUser => {
            if (currentUser) {
                res.status(500).send({
                    success: false,
                    error: "email already registered"
                });
            } else {
                var newUser = new userModel(data)
                    .save()
                    .then(newUser => {
                        res.status(200).send({
                            success: true,
                            msg: "User registered successfully"
                        });
                    })
                    .catch(error => {
                        res.status(500).send({
                            success: false,
                            error
                        });
                    });
            }
        });

});


module.exports = route;