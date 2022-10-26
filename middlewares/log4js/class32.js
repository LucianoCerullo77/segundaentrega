const log4js = require("log4js");

log4js.configure({
  appenders: {
    defAppender: { type: "console" },
    warnAppender: { type: "file", filename: "./logs/warn.log" },
    errorAppender: { type: "file", filename: "./logs/err.log" },

    loggerWarn: { type: "logLevelFilter", appender: "warnAppender", level: "warn" },
    loggerError: { type: "logLevelFilter", appender: "errorAppender", level: "error" },
  },
  categories: {
    default: { appenders: ["defAppender"], level: "info" },
    notFound: { appenders: ["loggerWarn", "defAppender"], level: "info" },
    apiError: { appenders: ["loggerError", "defAppender"], level: "info" },
  },
});

const loggerDefault = log4js.getLogger();
const loggerNotFound = log4js.getLogger("notFound");
const loggerApiError = log4js.getLogger("apiError");

module.exports = { loggerDefault, loggerNotFound, loggerApiError };