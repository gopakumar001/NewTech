const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const TYPES = {
    GOOGLE: "google",
    LOCAL: "local"
};


/**
 * -----------------------------------------
 * Google user model
 * -----------------------------------------
 */
const GoogleUser = new mongoose.Schema({
    displayName: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: true
    },
    type: {
        type: String
    }
});
GoogleUser.pre('save', function (next) {
    this._doc.type = TYPES.GOOGLE;
    next();
});
const googleUser = new mongoose.model("GoogleUser", GoogleUser);

/**
 * -----------------------------------------
 * Local user model.
 * -----------------------------------------
 */
const LocalUser = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String
    }
});

//Encrypt password before saving.
LocalUser.pre('save', function (next) {
    var pwd = this._doc.password;
    this._doc.type = TYPES.LOCAL;
    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(pwd, salt, (err, hash) => {
            if (err) throw err;
            this._doc.password = hash;
            next();
        });
    });
});

const localUser = new mongoose.model("LocalUser", LocalUser);
const models = {
    local: localUser,
    google: googleUser,
};

LocalUser.remove({}, ()=> {});
module.exports = {
    type : TYPES,
    getUserModel : function(type) {
        return models[type];  
    },
    comparePassword: function (candidatePassword, hash, callback) {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) throw err;
            callback(isMatch);
        });
    }
};