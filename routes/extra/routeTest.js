const express = require("express");
const { Router } = express;
const testRouter = new Router();
const log4js = require("log4js");

log4js.configure({
  appenders: {
    defAppender: { type: "console" },
    warnAppender: { type: "file", filename: "../../logs/warn.log" },
  },
  categories: {
    default: { appenders: ["defAppender"], level: "info" },
    warn: { appenders: ["warnAppender", "defAppender"], level: "warn" },
  },
});

let str = "";

testRouter.get("/", (req, res) => {
  for (let i = 0; i < 1000; i++) {
    str += "Hola que tal? ";
  }

  res.send(str);
});

module.exports = testRouter;