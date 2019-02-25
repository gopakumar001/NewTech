const mongoose = require("mongoose");
const Keys = require("./config/Keys");
const User = require("./models/User");
const bcrypt = require("bcrypt");



mongoose
    .connect(Keys.mongoDB.uri, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("App connected to mongo db");
        // var userDetails = {
        //     name: "gopa",
        //     email: "gopa2@test.com",
        //     password: "test"
        // }
        // User.findOne({
        //         email: userDetails.email
        //     })
        //     .then(user => {
        //         if (user) {
        //             console.log(`${user.email} already exsits`);
        //         } else {
        //             var newUser = new User(userDetails);
                    // bcrypt.genSalt(10, (err, salt) => {
                    //     bcrypt.hash(newUser.password, salt, (err, hash) => {
                    //         if (err) throw err;
                    //         newUser.password = hash;
                    //         newUser
                    //             .save()
                    //             .then(() => {
                    //                 console.log("new user added");
                    //             }).catch(err => {
                    //                 console.log(err);
                    //             });
                    //     });
                    // });

        //         }
        //     });
    })
    .catch(error => {
        console.log(error);
    });