const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const users = require("./routers/api/users");
const profiles = require("./routers/api/profiles");
//DB config
const db = require("./config/keys").mongoURI;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//passport initialization

//connect
mongoose.connect(db)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

/*app.get("/", (req, res) => {
    res.send("Hello World!");
})*/

app.use("/api/users", users);
app.use("/api/profiles", profiles);
const port = process.env.port || 5000;

app.listen(port, () => {
    console.log('Server running on port ${port}');
})