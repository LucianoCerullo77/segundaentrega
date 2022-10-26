const express = require("express");
const { Router } = express;
const minimist = require("minimist");

const processors = require("os");

const randomsRouter = new Router();



randomsRouter.get("/", (req, res) => {
  console.log(`port: ${Object.values(minimist(process.argv.slice(2)))[0][0] || 8080} -> Fyh: ${Date.now()}`);
  
  let info = {
    port: Object.values(minimist(process.argv.slice(2)))[0][0] || 8080,
    numb_random: Math.floor(Math.random() * 1000000 + 1),
    processorsAmount: processors.cpus().length,
  };
  res.render("pages/randoms", { info: info });
  
});

module.exports = randomsRouter;