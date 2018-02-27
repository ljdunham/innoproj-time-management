//Include passport and strategy
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
//Require keys for the oauth flow
const keys = require("../config/keys");

//Importing the user model this way will prevent an error in some
//testing environments where it requires schemas multiple times and mongoose
//gets confused
const User = mongoose.model("users");

//user.id = database _id for this user
//user is exported from done(null, existingUser/user) below
passport.serializeUser((user, done) => {
  done(null, user.id); // done(err, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//Passport is determined to use a new instance of GoogleStrategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      //console.log(accessToken);
      //console.log(refreshToken);
      //console.log(profile);
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with the given profile ID
          done(null, existingUser);
        } else {
          // we don't have a user record with this ID, make a new record
          new User({ googleId: profile.id }) //Create new model instance
            .save() //Save that instance
            .then(user => done(null, user)); //Promise callback user instance from database
        }
      });
    }
  )
);
