//Server side no ES2015 models e.g. require (node.js does not support)
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
// require defined user model / schema
require("./models/User");
// require passport setup which we built in to our application
require("./services/passport");

mongoose.connect(keys.mongoURI);

// our app object
const app = express();

// Define middlewares
// Tell the app to use cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    keys: [keys.cookieKey] //allows providing multiple keys to encrypt cookie
  })
);

//Tell passport to use cookies to manage authentication
app.use(passport.initialize());
app.use(passport.session());

// requires routes exported from authRoutes to be used in the app object
require("./routes/authRoutes")(app);

//Production environment

if (process.env.NODE_ENV === "production") {
  // Express will serve ip production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Port configuration for heroku and local
const PORT = process.env.PORT || 5000;
app.listen(PORT);
