const express = require("express");
const { Router } = express;
const testRouter = new Router();


let str = "";

testRouter.get("/", (req, res) => {
  console.log(req.url);
  for (let i = 0; i < 1000; i++) {
    str += "Hola que tal? ";
  }

  res.send(str);
});

module.exports = testRouter;