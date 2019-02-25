const express = require("express");
const route = express.Router();

route.get("/login", (req, res) => {
    res.redirect("./Login.html");
});

route.get("/register", (req, res) => {
    res.redirect("./Register.html");
});


route.get("/main", (req, res) => {
    console.log("Launching app main page");
    if(!req.user) {
        res.redirect("/logout");
    }else {
        res.redirect("./Main.html");
    }
});

route.get('/logout', (req, res) => {
    console.log("logging out of app");
    req.logOut();
    res.redirect("./Logout.html");
});

module.exports = route;