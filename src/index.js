const express = require('express');
const handlebars = require('express-handlebars');
const router = require("./routes.js");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser")
const {authentication} = require("../middlewares/authMiddleware")

const app = express();



app.engine("hbs", handlebars.engine(
    {
        extname: "hbs"
    }
));

app.set('view engine', "hbs");



app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(authentication)
app.use(router)

mongoose.set({"strictQuery": false})
mongoose.connect("mongodb://localhost:27017/book")   //<------------ put to right database name------------

app.listen(5080, console.log("Server is listeting on port 5080..."))