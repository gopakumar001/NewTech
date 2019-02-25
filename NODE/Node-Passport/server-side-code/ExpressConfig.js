const express = require("express");
const path = require("path")
const app = express();
const coreRoutes = require("./routes/core");
const authRoutes = require("./routes/auth");
const PORT = process.env.PORT || 7777;
const passport = require("passport");
const cookieSession = require("cookie-session");
const Keys = require("../config/Keys");
const bodyParser = require("body-parser");
const User = require("../models/User");


//Handling request body with body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Adding session configuration.
app.use(cookieSession({
    maxAge: 1 * 60 * 60 * 1000,
    keys: [Keys.cookie.encryptKey]
}));
app.use(passport.initialize());
app.use(passport.session());

//Adding public folder to express.
app.use(express.static(path.join(__dirname, "..", '/public')));
app.use(coreRoutes);
app.use("/auth", authRoutes);
try {
    app.listen(PORT, console.log(`Server is running on ${PORT}`));    
} catch (error) {
    console.log(`Server is already running on ${PORT}`);
}



//Auth Strategies 
passport.serializeUser(function (user, done) {
   console.log("User Serialize", user);
   done(null, { id: user.id, type: user.type });
});

passport.deserializeUser(function (serializeUserInfo, done) {
    console.log("User deserialize");
    console.log(serializeUserInfo);
    var user = User.getUserModel(serializeUserInfo.type);
    user.findById(serializeUserInfo.id, function (err, user) {
        done(err, user);
    });

});

var googleAuth = require("./GoogleAuth_2Strategy");
googleAuth(passport);
var localAuth = require("./LocalAuthStrategy");
localAuth(passport);


module.exports = app;

