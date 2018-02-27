if (process.env.NODE_ENV === "production") {
  // production return production keys
  module.exports = require("./prod");
} else {
  // development return development keys
  module.exports = require("./dev");
}
