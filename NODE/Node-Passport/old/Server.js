const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const auth = require("./Auth");

const app = express();
var router = express.Router();

app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: "myapp",
    resave: true,
    saveUninitialized: true
}));
auth(passport);
app.use(passport.initialize());
app.use(passport.session());

//Middleware added to parse request body.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(router);




module.exports = {

    start: function (port) {
        const PORT = process.env.PORT || port || 7777;
        app.listen(PORT, console.log(`Server is running on ${PORT}`));
        router.get("/", (req, res) => {
            res.send("Hello world");
        });

        router.post("/auth", (req, res, next) => {
            passport.authenticate('local', function (err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.send({
                        error: "unauthorized user"
                    });
                }
                req.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.send({
                        success: true
                    });
                });
            })(req, res, next);
        });
    }
};