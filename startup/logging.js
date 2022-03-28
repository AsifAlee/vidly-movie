require("express-async-errors");
const winston = require("winston");

module.exports = function () {
  winston.add(winston.transports.File, { filename: "logfile.log" });
  winston.handleExceptions(
    new winston.transports.File({ filename: "uncaughtException.log" }),
    new winston.transports.Console({ colorize: true, prettyPrint: true })
  );
  process.on("uncaughtException", (ex) => {
    console.log("we got an uncaught exception");
    winston.error(ex.message, ex);
  });

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
