const User = require("../../models/User");

module.exports = {

    TYPES: {
        GOOGLE: "google",
        LOCAL: "local"
    },

    getUserModel : function(type) {
        return User[type];  
    },

    findOrCreate: function (userConfig, findConfig, type, done) {
        var userModel = User[type];
        userModel
            .findOne(findConfig)
            .then(currentUser => {
                if (currentUser) {
                    done(null, currentUser);
                } else {
                    var newUser = new userModel(userConfig)
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

};