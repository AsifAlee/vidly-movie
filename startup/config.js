const config = require("config");

module.exports = function () {
  if (!config.get("jwt_PrivateKey")) {
    throw new Error("FATAL ERROR:environment variables are not set");
  }
};
