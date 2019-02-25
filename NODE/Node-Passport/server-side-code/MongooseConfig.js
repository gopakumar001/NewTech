const mongoose = require("mongoose");
const Keys = require("../config/Keys");
const user = require("../models/User");
mongoose
    .connect(Keys.mongoDB.uri, {
        useNewUrlParser: true
    }).then(()=>{
        console.log("conneted to mongo db");
    }).catch(err => {
        console.error(err);
    });