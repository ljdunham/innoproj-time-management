const q = require("q");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const refresh = require("passport-oauth2-refresh");

//Pass in users googleId
function getAccessToken(googleId) {
  var deferred = q.defer();

  User.findOne({ googleId: googleId }).then(existingUser => {
    //console.log(new Date());
    //console.log(existingUser.accessTokenExpiresIn);

    if (new Date() < existingUser.accessTokenExpiresIn) {
      //console.log("Not expired");
      deferred.resolve(existingUser.accessToken);
    } else {
      //console.log("Expired");

      refresh.requestNewAccessToken(
        "google",
        existingUser.refreshToken,
        (err, accessToken, refreshToken, params) => {
          //update expiredate and token
          if (!err) {
            //console.log("UPDATING");

            User.findOneAndUpdate(
              { googleId: googleId },
              {
                accessToken: accessToken,
                accessTokenExpiresIn:
                  new Date().getTime() + parseInt(params.expires_in) * 1000
              }
            ).then(deferred.resolve(accessToken));
          }
          deferred.reject(err);
        }
      );
    }
  });

  return deferred.promise;
}

module.exports = getAccessToken;
